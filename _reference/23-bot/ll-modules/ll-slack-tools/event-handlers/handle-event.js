const { blue, yellow, cyan, magenta, divider } = require('../ll-utilities/ll-logs')
// const airtableTools = require(`./utilities/airtable-tools`)
// const { handleSlackedFcpxml } =  require('./fcpxml-bot/fcpxml-tools')
// const path = require('path')
// const appHomeHandler = require('./app-home-handler')
// const handleImageFile = require(`./image-bot/external-link-listener`)
// const makeGif = require('./gif-bot/make-gif')
// const { gray, red } = require('./utilities/ll-logs')
// const { prepareStepArgs } = require('@slack/bolt/dist/WorkflowStep')

exports.fileShared = async ({ event, client}) => {
  try {
    const handledImageFiles = ["image/gif", "image/jpeg", "image/png"]
    yellow(divider, `launching fileShared handler`)
    gray(event)
    try {
      if (event.channel_id==process.env.SLACK_WORK_CHANNEL) {
        yellow(`received file in the work channel`)
        const fileInfo = await client.files.info({
          file: event.file_id,
        });
        yellow(`handing ${event.file_id}, here's the fileInfo;`)
        magenta(fileInfo)
      } else {
        gray(`file shared in non-work channel, we'll leave it alone for now`)
      }
    } catch (error) {
      red(error)
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

exports.message = async ({ event }) => {
  yellow(`got an event ${event.type}:`)
  if (event.subtype && event.subtype == "message_changed") {
    yellow("it's a message_changed event")
    // TODO: handle message_changed
    cyan(event)
  } else {
    gray('regular message--only handling changes here')
    gray(event)
  }
  
}

exports.appHomeOpened = appHomeHandler

exports.log = async ({ event }) => {
  const handledEvents = ["message","reaction_added", "reaction_removed", "app_home_opened", "file_shared"]
  if (handledEvents.includes(event.type)) {
    blue(`got an event of type ${event.type}, handling this elsewhere`)
    // magenta(event)
  } else {
    yellow(`currently unhandled event of type ${event.type}:`)
    gray(JSON.stringify(event))
  }
}



// if (event.channel_id == process.env.SLACK_EXTERNAL_LINKS_CHANNEL && handledImageFiles.includes(fileInfo.file.mimetype) ) {
//   await handleImageFile(event, client, fileInfo)
//   blue(`handled image file`)
// } else if (event.channel_id == process.env.SLACK_FCPXML_CHANNEL && path.extname(fileInfo.file.name) == ".fcpxml" ) {
//   yellow(`handling ${fileInfo.file.name} with ext ${path.extname(fileInfo.file.name)}`)
//   cyan(event)
//   await handleSlackedFcpxml(event, client, fileInfo)
// } else if (event.channel_id == process.env.SLACK_CREATE_GIF_CHANNEL) {
//     if (["mp4", "mov"].includes(fileInfo.file.filetype)) {
//       yellow(`handling movie ${fileInfo.file.name} with ext ${path.extname(fileInfo.file.name)}`)
//       const gifResult = await makeGif({
//         fileInfo: fileInfo,
//         client: client,
//         event: event,
//         width: 355,
//         height: 200
//       })
//       gray(gifResult)
//     }
//   cyan(event)
//   // await handleSlackedFcpxml(event, client, fileInfo)