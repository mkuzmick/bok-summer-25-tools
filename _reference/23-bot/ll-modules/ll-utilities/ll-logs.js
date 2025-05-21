const ansiColors = {
    black: `\u001b[30m`,
    red: `\u001b[38;5;196m`,
    green: `\u001b[32m`,
    yellow: `\u001b[38;5;11m`,
    blue: `\u001b[34m`,
    magenta: `\u001b[35m`,
    cyan: `\u001b[36m`,
    white: `\u001b[37m`,
    reset: `\u001b[0m`,
    gray: `\u001b[38;5;245m`,
    darkgray: `\u001b[38;5;239m`,
}

function myTypeOfLog(things, color) {
    things.forEach(thing => {
        if (typeof thing == "string") {
            console.log(`${ansiColors[color]}${thing}${ansiColors.reset}`)
        } else {
            console.log(`${ansiColors[color]}${JSON.stringify(thing, null, 4)}${ansiColors.reset}`)
        }
    })
}

module.exports.blue = (...things) => { myTypeOfLog(things, "blue" ) }
module.exports.cyan = (...things) => { myTypeOfLog(things, "cyan" ) }
module.exports.yellow = (...things) => { myTypeOfLog(things, "yellow" ) }
module.exports.magenta = (...things) => {myTypeOfLog(things, "magenta" ) }
module.exports.green = (...things) => {myTypeOfLog(things, "green" ) }
module.exports.red = (...things) => {myTypeOfLog(things, "red" ) }
module.exports.white = (...things) => {myTypeOfLog(things, "white" ) }
module.exports.gray = (...things) => {myTypeOfLog(things, "gray" ) }
module.exports.grey = (...things) => {myTypeOfLog(things, "gray" ) }
module.exports.darkgray = (...things) => {myTypeOfLog(things, "darkgray" ) }
module.exports.divider = `#########################################################\n#########################################################`