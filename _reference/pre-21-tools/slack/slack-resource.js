const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
// const s19 = require('../summer2019-tools');
const fs = require('fs');
const blx = require('./slack-block-builder');

var directSlackUpload = async function (markdownFile) {
  console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
  const uploadResult = await web.files.upload({
      file: fs.createReadStream(`${photo.stillFilePath}`),
      initial_comment: ("new photo " + photo.initialComment),
      filename: photo.name,
      channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
      title: "new still posted"
    })
  console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
  var messageBlocks = [];
  messageBlocks.push(blx.section(`enter your vote for ${photo.name}`))
  var messageResult = await web.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    text: `new message`,
    as_user: false,
    blocks: messageBlocks,
    channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
  }).catch(err=>{console.error("there was an error\n" + err);});
  // console.log("message result");
  // console.log(JSON.stringify(messageResult, null, 4));
  console.log("done slack message");
}

var s3ThenSlack = async function (photo){

}

var uploadWithReactions = async function (photo) {
  console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
  const uploadResult = await web.files.upload({
      file: fs.createReadStream(`${photo.stillFilePath}`),
      // initial_comment: ("new photo " + photo.initialComment),
      filename: photo.name,
      channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
      title: photo.name
    })
  // console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
  console.log("going to comment on " + uploadResult.file.shares.public[process.env.SLACK_PHOTO_REVIEW_CHANNEL][0].ts);
  try {
    await web.reactions.add({
      timestamp: uploadResult.file.shares.public[process.env.SLACK_PHOTO_REVIEW_CHANNEL][0].ts,
      name: "camera",
      channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
    });
  } catch (e) {
    console.error(e)
  }
  return uploadResult;
}

var uploadThenBlocks = async function (photo) {
  console.log("about to upload to channel " + process.env.SLACK_PHOTO_REVIEW_CHANNEL);
  const uploadResult = await web.files.upload({
      file: fs.createReadStream(`${photo.stillFilePath}`),
      initial_comment: ("new photo " + photo.initialComment),
      filename: photo.name,
      channels: process.env.SLACK_PHOTO_REVIEW_CHANNEL,
      title: "new still posted"
    })
  console.log('File uploaded: ', JSON.stringify(uploadResult, null, 4));
  var slackMessage = {
    token: process.env.SLACK_BOT_TOKEN,
    text: photo.initialComment,
    as_user: false,
    blocks: [
      blx.divider(),
      blx.jsonString('upload result', uploadResult),
      blx.divider(),
      blx.section("rank it"),
      blx.image("https://live.staticflickr.com/65535/48618334632_30deae5118_h.jpg")
    ],
    channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
  }
  web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
}

var introMessage = async function(cardInfo){
  var listOfClips = "";
  for (var i = 0; i < cardInfo.clips.length; i++) {
    listOfClips+=`\n${(i+1)}. ${cardInfo.clips[i].newName}`
  }
  var slackMessage = {
    token: process.env.SLACK_BOT_TOKEN,
    as_user: false,
    blocks: [
      blx.section(`Going to ship you some stills for ${cardInfo.FolderId}, including stills from the beginning, middle, and end of the following clips:\n${listOfClips}`),
    ],
    channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
  }
  web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
}

var outroMessage = async function(cardInfo, stillsToGrab){
  var listOfStills = "";
  for (var i = 0; i < stillsToGrab.length; i++) {
    listOfStills+=`\n${(i+1)}. ${stillsToGrab[i].name}`
  }
  var slackMessage = {
    token: process.env.SLACK_BOT_TOKEN,
    as_user: false,
    blocks: [
      blx.section(`So that's it, the complete list of stills is as follows:\n${listOfStills}\n\nBe sure to vote for your favorite!`),
    ],
    channel: process.env.SLACK_PHOTO_REVIEW_CHANNEL
  }
  web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
}

module.exports.directSlackUpload = directSlackUpload;
module.exports.uploadWithReactions = uploadWithReactions;
module.exports.s3ThenSlack = s3ThenSlack;
module.exports.uploadThenBlocks = uploadThenBlocks;
module.exports.introMessage = introMessage;
module.exports.outroMessage = outroMessage;
