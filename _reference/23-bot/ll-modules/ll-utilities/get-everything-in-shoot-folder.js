const fs = require('fs')

const getEverythingInShootFolder = async (shootFolder, factory) => {
    const elements = []
    const sources = fs.readdirSync(shootFolder);
    for (const source in sources) {
        if (Object.hasOwnProperty.call(object, source)) {
            const element = object[source];
            
        }
    }
    return elements
}