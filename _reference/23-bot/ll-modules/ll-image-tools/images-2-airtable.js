const fs = require('fs')
const { llog } = require('../ll-utilities')
const path = require('path')
const cp = require('child_process')
const { WebClient } = require('@slack/web-api')
const airtableTools = require('../ll-airtable-tools')
const { makeSlackImageUrl } = require('../ll-slack-tools/utils')

const images2airtable = async (folderPath) => {
    llog.magenta(`starting to convert the images files in ${folderPath}`)
    let newFolderPath = `${folderPath}_previews`
    if (!fs.existsSync(newFolderPath)){
        fs.mkdirSync(newFolderPath);
    }
    let convertOperations = fs.readdirSync(folderPath).map((e, i) => { 
        return (
            {
                oldPath: path.join(folderPath, e),
                newPath: path.join(newFolderPath, `${path.basename(e, path.extname(e))}.jpg`)
            }
        )
    })
    // loop through the operations
    // convert, send to Slack, send to Airtable
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);
    for (let i = 0; i < convertOperations.length; i++) {
        llog.gray(`working on`, convertOperations[i])
        await performConvertOperation(convertOperations[i])
        let slackUploadResult = await uploadToSlack(convertOperations[i].newPath, web)
        llog.blue(slackUploadResult)
        let slackPublicResult = await makeFilePublic(slackUploadResult.file.id)
        llog.gray(slackPublicResult)
        let atResult = await sendToAirtable(convertOperations[i].oldPath, slackUploadResult)
        llog.yellow(atResult)
    }

}

const performConvertOperation = async function(operation) {
    llog.magenta(llog.divider)
    await cp.spawnSync('convert', [
        '-resize', '1920',
        '-quality', '70%',
        '-auto-orient',
        '-contrast-stretch', '0.01%x0.01%',
        operation.oldPath, operation.newPath
    ])
    // await changeRotationMetadata(operation.newPath)
}

const uploadToSlack = async function(file, web) {
    const uploadResult = await web.files.upload({
        file: fs.createReadStream(`${file}`),
        initial_comment: ("new photo "),
        filename: file,
        channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
        title: "new still posted"
    })
    return uploadResult
}

const makeFilePublic = async function (fileId) {
    const webClient2 = new WebClient(process.env.SLACK_USER_TOKEN)
    let publicResult = await webClient2.files.sharedPublicURL({
        // token: process.env.SLACK_USER_TOKEN,
        file: fileId
    })
    return publicResult
}

const sendToAirtable = async function(filePath, slackUploadResult) {
    let airtableResult = await airtableTools.addRecord({
        baseId: process.env.AIRTABLE_PUMPKINS_BASE,
        table: "PhotoReviewStills",
        record: {
            
              "FileName": slackUploadResult.file.name,
            //   "MetadataJSON": ,
              "PreviewImage": [
                {
                  "url": makeSlackImageUrl(slackUploadResult.file.permalink, slackUploadResult.file.permalink_public)
                }
              ],
              "SlackLink": "http://slack.com",
              "InitialFilePath": filePath,
              "CaptureDate": "2022-10-28",
            //   "SlackTs": slackUploadResult.file.timestamp
          },

    })
    return airtableResult
}





module.exports = images2airtable




// var uploadWithReactions = async function (photo) {
//   console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
//   const uploadResult = await web.files.upload({
//       file: fs.createReadStream(`${photo.stillFilePath}`),
//       // initial_comment: ("new photo " + photo.initialComment),
//       filename: photo.name,
//       channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
//       title: photo.name
//     })
//   // console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
//   console.log("going to comment on " + uploadResult.file.shares.public[process.env.SLACK_PHOTO_REVIEW_CHANNEL][0].ts);
//   try {
//     await web.reactions.add({
//       timestamp: uploadResult.file.shares.public[process.env.SLACK_PHOTO_REVIEW_CHANNEL][0].ts,
//       name: "camera",
//       channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
//     });
//   } catch (e) {
//     console.error(e)
//   } 
//   return uploadResult;
// }

// var uploadThenBlocks = async function (photo) {
//   console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
//   const uploadResult = await web.files.upload({
//       file: fs.createReadStream(`${photo.stillFilePath}`),
//       initial_comment: ("new photo " + photo.initialComment),
//       filename: photo.name,
//       channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
//       title: "new still posted"
//     })
//   console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
//   var slackMessage = {
//     token: process.env.SLACK_BOT_TOKEN,
//     text: photo.initialComment,
//     as_user: false,
//     blocks: [
//       blx.divider(),
//       blx.jsonString('upload result', uploadResult),
//       blx.divider(),
//       blx.section("rank it"),
//       blx.image("https://live.staticflickr.com/65535/48618334632_30deae5118_h.jpg")
//     ],
//     channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
//   }
//   web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
// }

// var introMessage = async function(cardInfo){
//   var listOfClips = "";
//   for (var i = 0; i < cardInfo.clips.length; i++) {
//     listOfClips+=`\n${(i+1)}. ${cardInfo.clips[i].newName}`
//   }
//   var slackMessage = {
//     token: process.env.SLACK_BOT_TOKEN,
//     as_user: false,
//     blocks: [
//       blx.section(`Going to ship you some stills for ${cardInfo.FolderId}, including stills from the beginning, middle, and end of the following clips:\n${listOfClips}`),
//     ],
//     channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
//   }
//   web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
// }

// var outroMessage = async function(cardInfo, stillsToGrab){
//   var listOfStills = "";
//   for (var i = 0; i < stillsToGrab.length; i++) {
//     listOfStills+=`\n${(i+1)}. ${stillsToGrab[i].name}`
//   }
//   var slackMessage = {
//     token: process.env.SLACK_BOT_TOKEN,
//     as_user: false,
//     blocks: [
//       blx.section(`So that's it, the complete list of stills is as follows:\n${listOfStills}\n\nBe sure to vote for your favorite!`),
//     ],
//     channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
//   }
//   web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
// }

// for cli -- not server!


// // const s19 = require('../summer2019-tools');
// const fs = require('fs');
// const blx = require('./slack-block-builder');

// var directSlackUpload = async function (photo) {
//   console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
  

//   console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
//   var messageBlocks = [];
// //   messageBlocks.push(blx.section(`enter your vote for ${photo.name}`))
//   var messageResult = await web.chat.postMessage({
//     token: process.env.SLACK_BOT_TOKEN,
//     text: `new message`,
//     as_user: false,
//     // blocks: messageBlocks,
//     channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
//   }).catch(err=>{console.error("there was an error\n" + err);});
//   // console.log("message result");
//   // console.log(JSON.stringify(messageResult, null, 4));
//   console.log("done slack message");
// }
