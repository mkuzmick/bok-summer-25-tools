var path = require('path');
var makeStill = require('../ffmpeg/make-still');
var mk = require('../mk/utilities');
var timecodeTools = require('../timecode/timecode-tools');
var fs = require('fs');
var path = require('path');
var slackPhoto = require('../slack/slack-photo');
var AirtableAutoStill = require('../constructors/airtable-auto-still');
var airtableTools = require('../airtable/airtable-tools');


module.exports = async function getRandomStills(card, options){
  if (options && options.stillPer) {
    var stillPer = options.stillPer
  } else {
    var stillPer = 10*24;
  }
  if (options && options.totalStills) {
    var totalStills = options.totalStills
  } else {
    // var totalStills = 10;
    var totalStills = 10;
  }
  var stillsToGrab = [];
  var folderForStills = path.join(card.initialFolderPath, "stills");
  if (!fs.existsSync(folderForStills)) {
    fs.mkdirSync(folderForStills);
  }
  mk.purple('card.clips.length=', card.clips.length);
  for (var i = 0; i < card.clips.length; i++) {
    console.log("+++++++++++++++working+++++++++++++++++");
    mk.purple(card.clips[i].newName);
    var framesForThisClip = parseInt(card.clips[i].ffprobeData.streams[0].codec_type == "video" ?
    card.clips[i].ffprobeData.streams[0].nb_frames :
    card.clips[i].ffprobeData.streams[1].codec_type == "video" ?
    card.clips[i].ffprobeData.streams[1].nb_frames :
    card.clips[i].ffprobeData.streams[2].nb_frames);
    mk.orange("framesForThisClip", framesForThisClip);
    var startTc = card.clips[i].ffprobeData.streams[0].tags.timecode ? card.clips[i].ffprobeData.streams[0].tags.timecode :
      card.clips[i].ffprobeData.streams[1].tags.timecode ? card.clips[i].ffprobeData.streams[1].tags.timecode :
      card.clips[i].ffprobeData.streams[2].tags.timecode ? card.clips[i].ffprobeData.streams[2].tags.timecode :
      card.clips[i].ffprobeData.format.tags.timecode ? card.clips[i].ffprobeData.format.tags.timecode : "00:00:00:00";
    var framesToStartTc = timecodeTools.timecodeToFrames(startTc);
    var tcFromFramesTest = timecodeTools.framesToTimecode(framesToStartTc);
    console.log("framesToStartTc = " + framesToStartTc);
    console.log("tcFromFramesTest = " + tcFromFramesTest);
    var stillsForThisClip = Math.round(framesForThisClip/stillPer);
    mk.cyan("stillsForThisClip", stillsForThisClip);
    var framesCounter = framesToStartTc;
    for (var j = 0; j < stillsForThisClip; j++) {
      console.log("another still " + j);
      var newStillName = path.basename(card.clips[i].newPath)
      + "_"
      + timecodeTools.framesToTimecodeForFilename(framesToStartTc + j*stillPer)
      + '.jpg'
      stillsToGrab.push({
        seconds: j*stillPer*1001/24000,
        videoFilePath: card.clips[i].newPath,
        initialComment: "here's " + newStillName,
        name: newStillName,
        aggregateFrames: (framesToStartTc + j*stillPer),
        timecode: timecodeTools.framesToTimecode(framesToStartTc + j*stillPer),
        stillFilePath: path.join(folderForStills, newStillName)
      });
    }
  }
  mk.purple(stillsToGrab);
  var randomStills = [];
  if (stillsToGrab.length < totalStills) {
    randomStills = stillsToGrab;
  } else {
    for(var i = 0; i < totalStills; i++) {
      var idx = Math.floor(Math.random() * stillsToGrab.length);
      randomStills.push(stillsToGrab[idx]);
      stillsToGrab.splice(idx, 1);
    }
  }
  mk.orange(randomStills);
  for (var k = 0; k < randomStills.length; k++) {
    console.log("grabbing still for " + randomStills[k].videoFilePath);
    await makeStill(randomStills[k]);
    var slackResult = await slackPhoto.uploadWithReactions(randomStills[k]);
    // mk.cyan(slackResult);
    // var slackResult = await slackPhoto.directSlackUpload(randomStills[k])
    randomStills[k].slackTs = slackResult.file.shares.public[process.env.SLACK_PHOTO_REVIEW_CHANNEL][0].ts;
    var stillData = {
      name:randomStills[k].name,
      slackTs:randomStills[k].slackTs
    }
    var airtableStillRecord = new AirtableAutoStill(stillData);
    var airtableResult = await airtableTools.addRecord(airtableStillRecord,"Stills", process.env.AIRTABLE_INGEST_BASE)
    randomStills[k].airtableId = airtableResult.id;
    // console.log("&&&&&&&&&&& SLACK RESULT");
    // console.log(JSON.stringify(slackResult, null, 4));
  }
  console.log("done grabbing stills");
  console.log("done outer loop");
  return randomStills;
}
