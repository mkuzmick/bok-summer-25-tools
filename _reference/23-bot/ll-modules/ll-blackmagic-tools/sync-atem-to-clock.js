const { Atem } = require('atem-connection');

module.exports.syncAtemToClock = async (options) => {
    console.log(`starting the ATEM connection to sync`);
    const myAtem = new Atem(options.atemIp);
    myAtem.on('info', console.log)
    myAtem.on('error', console.error)
    myAtem.connect(options.atemIp)
    myAtem.on('connected', async () => {
        let now = new Date()
        myAtem.setTime(now.getHours(), now.getMinutes(), (now.getSeconds()+1), 7).then(() => {
            // console.log(`new ATEM Time is ${JSON.stringify(myAtem.state.info.lastTime, null, 4)}`);
            console.log(`set ATEM time, now ending the connection`);
            myAtem.disconnect()
        });
        await options.cb(`${now.toLocaleString()}`)
    })
    myAtem.on('disconnected', () => {
        console.log(`now disconnected from the ATEM. bye.`);
    })
    setTimeout(()=>{
        myAtem.destroy();
        console.log(`sorry, we couldn't connect to the ATEM`);
    }, 10000)
}

