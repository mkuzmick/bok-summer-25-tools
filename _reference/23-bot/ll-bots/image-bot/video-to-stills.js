const path = require('path')
const fs = require('fs')
const ffprobe = require('./ffprobe')
const { magenta, cyan, blue, gray, yellow } = require('../utilities/mk-utilities') 
const videoRegex = /\.(mov|mp4|m4v)$/i
const davinciVideoRegex = /_[a-zA-Z0-9]*-[a-zA-Z0-9]*\.[a-zA-Z]*$/i
const cp = require('child_process')

const videoToStill = async function (file, destinationFolder) {
    blue(`creating still from ${file}`)
    const ffprobeData = await ffprobe(file)
    const timecodeElements = ffprobeData.streams[0].tags.timecode.split(":")
    const tc = timecodeElements.join("")
    const newPathRoot = `${file.split(davinciVideoRegex)[0]}_${tc}`
    magenta(ffprobeData)
    if (fs.existsSync(`${newPathRoot}.png`)) {
        const altPathRoot = `${file.split(/\.[a-zA-Z]*$/i)[0]}_${tc}`
        await cp.spawnSync('ffmpeg', [
            '-i', file,
            '-vframes', '1',
            // '-q:v', '2',
            `${newPathRoot}.png`
        ])
    } else {
        await cp.spawnSync('ffmpeg', [
            '-i', file,
            '-vframes', '1',
            // '-q:v', '2',
            `${newPathRoot}.png`
        ])
    }
    // fs.unlinkSync(file)
}

const folderToStills = async function (folder) {
    blue(`is directory`)
    const potentialVideoFiles = fs.readdirSync(folder)
    for (let i = 0; i < potentialVideoFiles.length; i++) {
        let filePath = path.join(folder, potentialVideoFiles[i]) 
        if (videoRegex.test(filePath)) {
            videoToStill(filePath)
        }
    }
}

module.exports = async function (pathToCheck) {
    cyan(pathToCheck)
    if (fs.statSync(pathToCheck).isFile()) {
        videoToStill(pathToCheck, )
    } else if (fs.statSync(pathToCheck).isDirectory()) {
        folderToStills(pathToCheck)
    }
}