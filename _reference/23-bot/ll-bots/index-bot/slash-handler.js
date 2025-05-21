const atemTools = require(`../../ll-modules/ll-blackmagic-tools`)
var Airtable = require('airtable');
var fs = require('fs');
var path = require('path');
const { ConsoleLogger } = require('@slack/logger');
const atemButtonBlocks = require('../atem-bot/atem-button-blocks')
const hubButtonBlocks = require('../atem-bot/hub-button-blocks')
const { llog } = require('../../ll-modules/ll-utilities')
const studioStartup = require('../atem-bot/studio-startup')
const liveLogBot = require('../live-log-bot')
const slateBot = require('../slate-bot')


exports.switch = async ({ command, ack, say }) => {
    ack();
    console.log(JSON.stringify(command, null, 4))
    console.log(`let's try a simple switch to camera ${command.text}`)
    await atemTools.switchCamera({
        atemIp: process.env.A8K_IP,
        camera: command.text
    })
}

exports.macro = async ({ command, ack, say }) => {
    ack();
    console.log(JSON.stringify(command, null, 4))
    console.log(`running macro ${command.text}`)
    await atemTools.macro({
        atemIp: process.env.A8K_IP,
        macro: command.text
    })
}

exports.atemButtons = async ({ command, client, ack, say }) => {
    ack();
    try {
        llog.red(command, null, 4)
        console.log(`let's try a simple switch to camera ${command.text}`)
        const blx = await atemButtonBlocks()
        llog.blue(blx)
        if (command.channel_name !== "directmessage") {
            await say({
                blocks: blx,
                text: `this game requires blocks`
            })
        } else {
            await client.chat.postMessage({
                blocks: blx,
                channel: command.user_id,
                text: `this game requires blocks`
            })
        }
    } catch (error) {
        llog.red(error)
    }
    
}


exports.hub =  async ({ command, client, ack, say }) => {
    ack();
    try {
        llog.blue(command, null, 4)
        console.log(`hub command ${command.text}`)
        const blx = await hubButtonBlocks()
        llog.blue(blx)
        if (command.channel_name !== "directmessage") {
            await say({
                blocks: blx,
                text: `this game requires blocks`
            })
        } else {
            await client.chat.postMessage({
                blocks: blx,
                channel: command.user_id,
                text: `this game requires blocks`
            })
        }
    } catch (error) {
        llog.red(error)
    }
    
}



exports.log = liveLogBot

exports.slate = slateBot


exports.a8ksync = async ({ command, ack, say }) => {
    ack();
    console.log(JSON.stringify(command, null, 4))
    console.log(`let's sync the atem to server time`)
    await atemTools.syncAtemToClock({
        atemIp: process.env.A8K_IP,
        cb: async (time) => {
            await say(`syncing to ${time}`)
        }
    })
}

exports.studiostartup = studioStartup

exports.hundredStills = async ({ command, ack, say }) => {
    ack();
    const theRecords = await findManyByValue({
        field: "DateByFormula",
        value: command.text,
        table: "StillsRequests"
    })
    var theEDL = `TITLE: the-${command.text}-stills\nFCM: NON-DROP FRAME\n\n`
    for (let i = 0; i < theRecords.length; i++) {
        const element = theRecords[i];
        // console.log(JSON.stringify(element, null, 4));
        theEDL+=`${(i+1).toString().padStart(3, "0")}  AX       V     C        ${inTc(element.fields.Timecode)} ${outTc(element.fields.Timecode)} ${framesToTimecode(i)} ${framesToTimecode(i+1)}\n* FROM CLIP NAME: ${element.fields.VideoFileName}\n\n`
    }
    const pathForEDL = path.join(process.env.EXPORTS_FOLDER, `the-${command.text}-stills-${Date.now()}.edl`)
    await say(`we'll get your EDL from ${command.text} and we'll save it here: ${pathForEDL}. Head over to the Main Mac Studio to import it into resolve.`)
    await fs.writeFileSync(pathForEDL, theEDL)
}

exports.rocket = async ({ message, say }) => {
    await say(`thanks for the :rocket:, <@${message.user}>`);
}


const findManyByValue = async function(options) {
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_SUMMER_BASE);
    theRecords = [];
    var queryOptions = {
      maxRecords: options.maxRecords ? options.maxRecords : 100,
      view: options.view ? options.view : "Grid view",
      filterByFormula: `${options.field}=${options.value}`
    }
    // console.log(queryOptions);
    await base(options.table).select(queryOptions).eachPage(function page(records, next){
      theRecords.push(...records);
      next()
    })
    // .then(()=>{
    //   // return(theRecords);
    // })
    .catch(err=>{console.error(err); return})
    return theRecords;
  }
  
const framesToTimecode = (frames) => {
    const theFrames = frames%24
    console.log(`theFrames: ${theFrames}`)
    const theSeconds =((frames - theFrames)/24)%60
    console.log(`theSeconds: ${theSeconds}`)

    const theMinutes = (frames - theFrames - theSeconds*24)/(24*60)%60
    
    console.log(`theMinutes: ${theMinutes}`)

    return `00:${theMinutes.toString().padStart(2, "0")}:${theSeconds.toString().padStart(2, "0")}:${theFrames.toString().padStart(2, "0")}`
}

const inTc = (atc) => {
    console.log(`getting inTc from ${atc}.`)
    var ms = parseFloat(atc.split(".")[1])
    // console.log(`ms are ${ms}.`)
    return `${atc.split(".")[0]}:${Math.floor(ms*24/1000).toString().padStart(2, "0")}`
}

const outTc = (atc) => {
    var ms = parseFloat(atc.split(".")[1])
    return `${atc.split(".")[0]}:${Math.floor(ms*24/1000 + 1).toString().padStart(2, "0")}`
}