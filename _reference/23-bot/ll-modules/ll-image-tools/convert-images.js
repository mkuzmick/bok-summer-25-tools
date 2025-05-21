const { llog, getEverythingInShootFolder } = require("../ll-utilities")


const convertImages = async (folderPath) => {
    llog.blue("converting all the ")
    llog.blue(folderPath)
    let elements = await getEverythingInShootFolder(folderPath)
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        
    }
}

module.exports = convertImages