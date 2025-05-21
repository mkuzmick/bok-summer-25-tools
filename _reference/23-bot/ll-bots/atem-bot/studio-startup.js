const { Atem } = require('atem-connection');


const atemTools = require(`../../ll-modules/ll-blackmagic-tools`)
var Airtable = require('airtable');
var fs = require('fs');
var path = require('path');
const { llog } = require('../../ll-modules/ll-utilities')


const studioStartup = async ({ command, ack, say }) => {
    ack();
    console.log(JSON.stringify(command, null, 4))
    console.log(`let's sync the atem to server time`)
        myAtem.on('info', console.log)
        myAtem.on('error', console.error)
        myAtem.connect(options.atemIp)
        myAtem.on('connected', async () => {
            let now = new Date()
            // sync timecode to clocktime
            myAtem.setTime(now.getHours(), now.getMinutes(), (now.getSeconds()+1), 7)
                .then(() => {
                // console.log(`new ATEM Time is ${JSON.stringify(myAtem.state.info.lastTime, null, 4)}`);
                console.log(`set ATEM time, now ending the connection`);
                // myAtem.disconnect()
            });
            await say(`syncing to ${time} and doing some other stuff ultimately. Hopefully everything was turned on when you ran this slash command. If it wasn't, maybe go and turn everything on and run it again BEFORE you start recording. But if everything went well you can start rolling on the all-day drive in hyperdeck 1.`);

            // route everything in the videohub

            // normalize all cameras
            // format hyperdeck 1 drive and start recording program 1 on it


    })
    myAtem.on('disconnected', () => {
        console.log(`now disconnected from the ATEM. bye.`);
    })
    setTimeout(()=>{
        myAtem.destroy();
        console.log(`sorry, we couldn't connect to the ATEM`);
    }, 10000)

    
    


}

module.exports = studioStartup