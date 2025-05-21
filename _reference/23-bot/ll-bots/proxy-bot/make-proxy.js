var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var movRegex = /(mov|mp4|m4v)/i;
var filesToCopyRegex = /(jpg|wav|png|aac|mp3|jpeg|drp)/i;
var ffprobeToJson = require('./ffprobe-to-json');
const { cyan, blue, yellow, magenta, gray, white, divider } = require(`../utilities/mk-utilities`);
var intervalToDuration = require('date-fns/intervalToDuration')
var format = require('date-fns/format')

const makeMonthOfProxy = async function (folder, options) {
    const jobStart = new Date()
    gray(`starting makeMonthOfProxy at ${format(jobStart, "yyyyMMdd.HH:mm:ss.SSS")} with folder:\n${folder}\nand options:\n${JSON.stringify(options, null, 4)}`)
    const listOfShootsInMonth = getlistOfShootsInMonth(folder)
    const monthProxyFolder = `${folder}_proxy`
    if (!fs.existsSync(monthProxyFolder)){
        fs.mkdirSync(monthProxyFolder);
    }
    magenta(listOfShootsInMonth)
    for (let i = 0; i < listOfShootsInMonth.length; i++) {
        const element = listOfShootsInMonth[i];
        let proxyResult = await makeShootProxy(element, { monthFolder: monthProxyFolder })
    }
    const jobEnd = new Date()
    blue(`time for full month to complete:`)
    blue(intervalToDuration({start: jobStart, end: jobEnd}))
}

const makeDayOfProxy = async function (dayFolder, options) {
    const shootsInDay = []
    const potentialShoots = fs.readdirSync(dayFolder)
    for (let i = 0; i < potentialShoots.length; i++) {
        const potentialShoot = potentialShoots[i];
        if (fs.lstatSync(path.join(dayFolder, potentialShoot)).isDirectory()) {
            shootsInDay.push(path.join(dayFolder, potentialShoot))
        }
    }
    blue(shootsInDay)
}

const makeShootProxy = async function (folder, options) {
    const jobStart = new Date()
    gray(`starting makeShootProxy at ${format(jobStart, "yyyyMMdd.HH:mm:ss.SSS")} with folder:\n${folder}\nand options:\n${JSON.stringify(options, null, 4)}`)
    const listOfOperations = await createListOfOperations(folder, options)
    magenta(divider, `listOfOperations`, divider)
    gray(listOfOperations)
    const result = await performOperations(listOfOperations)
    const jobEnd = new Date()
    magenta(intervalToDuration({start: jobStart, end: jobEnd}))
    return "done"
}

const getlistOfShootsInMonth = (folder, options) => {
    const shootsInMonth = []
    const daysInMonth = []
    const potentialDays = fs.readdirSync(folder)
    for (let i = 0; i < potentialDays.length; i++) {
        const potentialDay = potentialDays[i];
        // add regex to check number
        if (fs.lstatSync(path.join(folder, potentialDay)).isDirectory()) {
            daysInMonth.push(path.join(folder, potentialDay))
            const potentialShoots = fs.readdirSync(path.join(folder, potentialDay))
            for (let j = 0; j < potentialShoots.length; j++) {
                // add regex to check that the name of folder conforms to shoot structure
                const potentialShoot = potentialShoots[j];
                if (fs.lstatSync(path.join(folder, potentialDay, potentialShoot)).isDirectory())  {
                    shootsInMonth.push(path.join(folder, potentialDay, potentialShoot))
                }
            }
        }
    }
    blue(daysInMonth)
    return shootsInMonth
}

const createListOfOperations = (folder, options) => {
    const fileOperations = {
        proxyFolder: options && options.monthFolder ? path.join(options.monthFolder, `${path.basename(folder)}.proxy`) : path.join(path.dirname(folder), `${path.basename(folder)}.proxy`),
        proxySubfolders: [],
        proxies: [],
        copies: [],
        unknowns: [],
        errorLogs: []
    }
    const folderContents = fs.readdirSync(folder)
    for (let i = 0; i < folderContents.length; i++) {
        const source = folderContents[i];
        if (fs.lstatSync(path.join(folder, source)).isDirectory()) {
            const proxySubfolder = path.join(fileOperations.proxyFolder, source)
            fileOperations.proxySubfolders.push(proxySubfolder)
            const sourceFiles = fs.readdirSync(path.join(folder, source))
            for (let index = 0; index < sourceFiles.length; index++) {
                const element = sourceFiles[index];
                if (movRegex.test(element)) {
                    fileOperations.proxies.push({
                        sourcePath: path.join(folder, source, element),
                        destinationPath: path.join(proxySubfolder, element )
                    })
                } else if (filesToCopyRegex.test(element)) {
                    blue(`${element} is a recognized file-to-be-copied`)
                    fileOperations.copies.push({
                        sourcePath: path.join(folder, source, element),
                        destinationPath: path.join(proxySubfolder, element)
                    })
                } else {
                    fileOperations.unknowns.push({
                        sourcePath: path.join(folder, source, element),
                        destinationPath: `unknown`
                    })
                    fileOperations.errorLogs.push(`${element}, in the source folder ${path.join(folder, source)} doesn't appear to be a folder`)
                }            
            }
        } else {
            fileOperations.errorLogs.push(`${source}, in the root folder ${folder} doesn't appear to be a folder`)
        }
    }
    return fileOperations
}

const performOperations = async ({ proxyFolder, proxySubfolders, proxies, copies }) => {
    blue(divider, `performing operations`, divider)
    if (!fs.existsSync(proxyFolder)) {
        fs.mkdirSync(proxyFolder)
    }
    proxySubfolders.forEach(f => {
        if (!fs.existsSync(f)) {
            fs.mkdirSync(f)
        }
    });
    for (let i = 0; i < proxies.length; i++) {
        const element = proxies[i];
        await transcodeFile(element.sourcePath, element.destinationPath)        
    }
    for (let i = 0; i < copies.length; i++) {
        const element = copies[i];
        await fs.copyFileSync(element.sourcePath, element.destinationPath)
    }
}

var transcodeFile = async function(file, proxyPath, options){
    magenta(divider)
    blue(`transcoding ${file}`)
    magenta(divider)
    await cp.spawnSync('ffmpeg', [
      '-i', file,
      '-c:v', 'libx264',
    //   `-c:v`, `libx265`,
      '-pix_fmt', 'yuv420p',
    //   `-tag:v`, `hvc1`, 
      `-vf`, `scale=-1:1080`,
      '-preset', 'slow',
      '-crf', (options && options.crfVal) ? options.crfVal : '28',
      '-ac', '2',
      '-c:a', 'aac',
      '-b:a', '128k',
      proxyPath
    ], {
      stdio: [
        0, // Use parent's stdin for child
        'pipe', // Pipe child's stdout to parent
        2 // Direct child's stderr to a file
      ]
    });
}

module.exports.makeShootProxy = makeShootProxy;
module.exports.makeMonthOfProxy = makeMonthOfProxy;

