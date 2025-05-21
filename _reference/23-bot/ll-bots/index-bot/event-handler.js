const { blue, yellow, cyan, magenta } = require('../../ll-modules/ll-utilities/mk-utilities')
const airtableTools = require(`../../ll-modules/ll-airtable-tools`)
const { handleSlackedFcpxml } =  require('../fcpxml-bot/fcpxml-tools')
const path = require('path')
const appHomeHandler = require('./app-home-handler')
const handleImageFile = require(`../image-bot/external-link-listener`)
const makeGif = require('../gif-bot/make-gif')
// const { prepareStepArgs } = require('@slack/bolt/dist/WorkflowStep')

exports.fileShared = async ({ event, client}) => {
  try {
    const handledImageFiles = ["image/gif", "image/jpeg", "image/png"]
    magenta(`launching fileShared handler`)
    magenta(event)
    const fileInfo = await client.files.info({
      file: event.file_id,
    });
    yellow(`handing ${event.file_id}, here's the fileInfo;`)
    yellow(fileInfo)
    if (event.channel_id == process.env.SLACK_EXTERNAL_LINKS_CHANNEL && handledImageFiles.includes(fileInfo.file.mimetype) ) {
      await handleImageFile(event, client, fileInfo)
      magenta(`handled image file`)
    } else if (event.channel_id == process.env.SLACK_FCPXML_CHANNEL && path.extname(fileInfo.file.name) == ".fcpxml" ) {
      yellow(`handling ${fileInfo.file.name} with ext ${path.extname(fileInfo.file.name)}`)
      cyan(event)
      await handleSlackedFcpxml(event, client, fileInfo)
    } else if (event.channel_id == process.env.SLACK_CREATE_GIF_CHANNEL) {
        if (["mp4", "mov"].includes(fileInfo.file.filetype)) {
          yellow(`handling movie ${fileInfo.file.name} with ext ${path.extname(fileInfo.file.name)}`)
          const gifResult = await makeGif({
            fileInfo: fileInfo,
            client: client,
            event: event,
            width: 355,
            height: 200
          })
          magenta(gifResult)
        }
      cyan(event)
      // await handleSlackedFcpxml(event, client, fileInfo)
    } 
  } catch (error) {
    yellow(`eventHandler.fileShared failed`)
    console.error(error)
  }
}

exports.reactionAdded = async ({ event }) => {
  yellow(`got a reactionAdded: ${event.type}:`)
  cyan(event)
}

exports.reactionRemoved = async ({ event }) => {
  yellow(`got a reactionRemoved ${event.type}:`)
  cyan(event)
}

exports.appHomeOpened = appHomeHandler

exports.log = async ({ event }) => {
  const handledEvents = ["message","reaction_added", "reaction_removed", "app_home_opened", "file_shared"]
  if (handledEvents.includes(event.type)) {
    blue(`got an event of type ${event.type}, handling this elsewhere`)
    // magenta(event)
  } else {
    yellow(`currently unhandled event of type ${event.type}:`)
    cyan(JSON.stringify(event))
  }
}


// from pumpkin
// 
// const fileShared = async ({ event, client}) => {
//   try {
//     // if imageRegex.test(event.)
//     llog.gray(llog.divider, `launching fileShared handler with event:`, event)
//     const fileInfo = await client.files.info({
//       file: event.file_id,
//     });
//     llog.yellow("fileInfo:", fileInfo)
//     if (event.channel_id==process.env.SLACK_WORK_CHANNEL && imageRegex.test(fileInfo.file.mimetype) ) {
//       llog.magenta(`received file in the work channel: ${event.file_id}\ngoing to hand off to the image-bot\n\n`)
//       let imageBotResult = await imageBot({ event: event, client: client, fileInfo: fileInfo})
//     } else {
//       llog.gray(`file shared in non-work channel, we'll leave it alone for now`)
//     }
//   } catch (error) {
//     llog.red(`eventHandler.fileShared failed`)
//     llog.red(error)
//     console.error(error)
//   }
// }


// module.exports = fileShared