const { Atem } = require('atem-connection');
// const { makeGif } = require("./make-gif");
const { syncAtemToClock } = require("./sync-atem-to-clock")

const switchCamera = async (options) => {
    console.log(`starting the ATEM`);
    const myAtem = new Atem();
    myAtem.on('info', console.log)
    myAtem.on('error', () => {console.error})
    myAtem.connect(options.atemIp)
    myAtem.on('connected', () => {
        myAtem.changeProgramInput(options.camera).then(() => {
            console.log(`program input set to ${options.camera}. now ending the connection`);
            myAtem.disconnect()
        })
    })
    myAtem.on('disconnected', () => {
        console.log(`now disconnected from the ATEM. bye.`);
    })
    // if we can't connect within 10 seconds we'll give up
    setTimeout(()=>{
        myAtem.destroy();
        console.log(`sorry, we couldn't connect to the ATEM`);
    }, 10000)
}

const macro = async (options) => {
    console.log(`starting the ATEM macro`);
    const myAtem = new Atem();
    myAtem.on('info', console.log)
    myAtem.on('error', () => {console.error})
    myAtem.connect(options.atemIp)
    myAtem.on('connected', () => {
        myAtem.macroRun(parseInt(options.macro)).then(() => {
            console.log(`ran macro ${options.macro}. now ending the connection`);
            console.log(myAtem.state.macro)
            myAtem.disconnect()
        })
    })
    myAtem.on('disconnected', () => {
        console.log(`now disconnected from the ATEM. bye.`);
    })
    // if we can't connect within 10 seconds we'll give up
    setTimeout(()=>{
        myAtem.destroy();
        console.log(`sorry, we couldn't connect to the ATEM`);
    }, 10000)
}


module.exports.macro = macro
module.exports.switchCamera = switchCamera
module.exports.syncAtemToClock = syncAtemToClock
