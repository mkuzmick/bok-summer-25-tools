const fs = require("fs")
const path = require("path")
// const Shoot = require("./constructors/shoot")
const validateShootPath = require("./elements/validate-shoot-path")
const { llog } = require('../ll-utilities')
const shootRegex = /\d{8}.\d+.\d{3}_[a-zA-Z0-9]+.[a-zA-Z0-9]+.[a-zA-Z0-9]+/g

const ingest = async function(options) {
    llog.blue(`*************\nlaunching ingest with folderpath:\n${JSON.stringify(options, null, 4)}`);
    let shootFolder = await testForShootFolder(options)
    if (shootFolder !== false) {
        llog.blue(`shootfolder: ${shootFolder}`)
    } else {
        llog.red('not a shootfolder')
    }
}

const testForShootFolder = async function (options) {
    
    if (options.amx && typeof options.amx == "string") {
        llog.magenta(`${options.amx} is a folderpath for amx`)
        if (validateShootPath(options.amx) !== false) {
            llog.yellow(`passed shootpath validate`)
            // const theShoot = new Shoot(options.amx);
            return options.amx
        }
    } else if (options.amx && typeof options.amx == "boolean") {
        llog.magenta(`${options.amx} isn't a string, so we're going to assume that ${options.ingest} is the folder`)
        if (validateShootPath(options.amx) !== false) {
            llog.red(validateShootPath(options.amx))
            llog.yellow(`passed shootpath validate`)
            // const theShoot = new Shoot(options.amx);
            return options.ingest
        }
    } else {
        llog.magenta(`doesn't look like an amx`)
        return false
    }
}

const stepOne = async function (folderPath) {
    if (validateShootPath(folderPath)) {
        const theShoot = new Shoot(folderPath);
        const allTheSubFolders = await getDirsInDir(folderPath);
        theShoot.files = await createFileObjects(allTheSubFolders, theShoot.shootId)
        theShoot.log();
        console.log(`about to change names`);
        await changeTheNames(theShoot.files);
    } else {
        console.log(`doesn't look like ${folderPath} is a valid shootFolder`)
        return false
    }
}


const getDirsInDir = async function (dirPath) {
    console.log("getting the directories in this directory");
    const dirPaths = []
    const dirsInDir = fs.readdirSync(dirPath);
    for (let i = 0; i < dirsInDir.length; i++) {
        const element = dirsInDir[i];
        if (element!==".DS_Store" && fs.statSync(path.join(dirPath, element)).isDirectory()) {
            dirPaths.push(path.join(dirPath, element));
          }
    }
    console.log(JSON.stringify(dirPaths))
    return dirPaths;
}

async function createFileObjects(folders, shootId){
    const allTheFiles = []
    for (let index = 0; index < folders.length; index++) {
        const element = folders[index];
        const theseFiles = await getDirFiles(element, shootId);
        allTheFiles.push(...theseFiles);
    }
    return allTheFiles;
}

const getDirFiles = async function (dirPath, shootId) {
    console.log(`getting the paths in ${dirPath}`);
    const fileObjects = []
    const filesInDir = fs.readdirSync(dirPath);
    for (let i = 0; i < filesInDir.length; i++) {
        const element = filesInDir[i];
        const counter = i+1;
        if (element!==".DS_Store" && !fs.statSync(path.join(dirPath, element)).isDirectory()) {
            let extension = path.extname(path.join(dirPath, element));
            let theCounter = 1+i
            fileObjects.push(
                {
                    oldPath: path.join(dirPath, element),
                    newPath: path.join(dirPath, `${shootId}_${path.basename(dirPath)}.${('0000'+theCounter).slice(-4)}${extension}`)
                }
            );
        }
        // else handle subfolders in the wrong place and wrong files
    }
    return fileObjects;
}

async function changeTheNames(operationArray) {
    // accepts array of objects with {oldPath: '/some/path' newPath: '/some/path'}
    for (let index = 0; index < operationArray.length; index++) {
        const element = operationArray[index];
        console.log(`we will rename ${element.oldPath} to ${element.newPath}`);
        fs.renameSync(element.oldPath, element.newPath)
    }
}

module.exports = ingest
