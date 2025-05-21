const fs = require("fs")
const path = require("path")
const { llog } = require('../ll-utilities')
const airtableTools = require('../ll-airtable-tools')

const getAirtableData = async function (){
    const airtableData = await airtableTools.findMany({
        baseId: process.env.AIRTABLE_STUDIO_BOT_BASE,
        table: "SHOOTS_FOR_FOLDERS",
        view: "CREATE_FOLDERS"
    })
    return airtableData;
}

const eventsToFolders = async function(options) {
    llog.blue(`*************\nlaunching makeFolders with options:\n${JSON.stringify(options, null, 4)}`)
    const airtableData = await getAirtableData();
    const parentFolder = options.parentFolder || process.cwd()
    for (let index = 0; index < airtableData.length; index++) {
        const element = airtableData[index];
        fs.mkdirSync(path.join(parentFolder, element.fields.FolderName))
        llog.darkgray(`created ${element.fields.FolderName}`)
    }
}

module.exports = eventsToFolders
