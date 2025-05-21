const fs = require("fs")
const path = require("path")
const shootRegex = /\d{8}.\d+.\d{3}_[a-zA-Z0-9]+.[a-zA-Z0-9]+.[a-zA-Z0-9]+/g

const validateShootPath = async function (dirPath) {
    console.log(`testing ${dirPath}`)
    // add some additional validation here

    // regex of path to see if it's structured right
    // offer to create properly structured name? or other feedback
    // regex of subfolders to check structure
    // look for random files
    // see if subfolders contain nothing but acceptable files
    if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
        console.log(`not a directory`)
        return false;
    } else if (!shootRegex.test(path.basename(dirPath))){
        console.log(`not a validate shoot id`)
        return false;
    } else {
        return dirPath;
    }
}

module.exports = validateShootPath