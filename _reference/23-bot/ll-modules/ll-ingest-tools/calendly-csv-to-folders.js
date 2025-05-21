const fs = require("fs")
const path = require("path")
const { llog } = require('../ll-utilities')
const csv = require('csv-parser');
// const calendlyJsonTemp = require(`../../../_tests/calendly-json.json`)

const calendlyCsvToFolders = async function(options) {
    llog.blue(`*************\nlaunching calendly-to-folders with options:\n${JSON.stringify(options, null, 4)}`)
    for (let index = 0; index < calendlyJsonTemp.length; index++) {
        const element = calendlyJsonTemp[index];
        llog.magenta(`new element`)
        // llog.yellow(element)
        let theDate = new Date(Date.parse(element["Start Date & Time"])) 
        llog.yellow(theDate)
        let theFolderName = `${theDate.getHours().toString().padStart(2, '0')}${theDate.getMinutes().toString().padStart(2, '0')}_${element["Invitee Name"].replace(/\ /g, "_")}`
        llog.blue(theFolderName)
        fs.mkdirSync(path.join(options.calendly2folders, theFolderName))
    }
}

async function changeTheNames(operationArray) {
    console.log(`renaming x to y`);
    return("array of naming operations");
}

module.exports = calendlyCsvToFolders
