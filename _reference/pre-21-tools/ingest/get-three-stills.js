var path = require('path');
var makeStill = require('../ffmpeg/make-still');
var mk = require('../mk/utilities');
var timecodeTools = require('../timecode/timecode-tools');
var fs = require('fs');
var path = require('path');
var slackPhoto = require('../slack/slack-photo');


module.exports = async function getThreeStills(card, options){
  if (options && options.stillPer) {
    var stillPer = options.stillPer
  } else {
    var stillPer = 60*24;
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
    var frameMarksForStills = [
      0,
      Math.round(framesForThisClip/2),
      (framesForThisClip - 1)
    ];
    mk.orange("frameMarksForStills", frameMarksForStills);
    var framesToStartTc = timecodeTools.timecodeToFrames(card.clips[i].ffprobeData.streams[0].tags.timecode);
    console.log("framesToStartTc = " + framesToStartTc);
    for (var j = 0; j < frameMarksForStills.length; j++) {
      console.log("another still " + j);
      var newStillName = path.basename(card.clips[i].newPath)
      + "_"
      + timecodeTools.framesToTimecodeForFilename(framesToStartTc + frameMarksForStills[j])
      + '.jpg'
      stillsToGrab.push({
        seconds: frameMarksForStills[j]*1001/24000,
        videoFilePath: card.clips[i].newPath,
        initialComment: "here's " + newStillName,
        name: newStillName,
        aggregateFrames: frameMarksForStills[j],
        timecode: timecodeTools.framesToTimecode(framesToStartTc + frameMarksForStills[j]),
        stillFilePath: path.join(folderForStills, newStillName)
      });
    }
  }
  mk.purple(stillsToGrab);
  var introSlackResult = await slackPhoto.introMessage(card);
  // TODO: need to grab slack ts
  // and add it to the still before sending to Airtable
  for (var k = 0; k < stillsToGrab.length; k++) {
    console.log("grabbing still for " + stillsToGrab[k].videoFilePath);
    await makeStill(stillsToGrab[k]);
    var slackResult = await slackPhoto.uploadWithReactions(stillsToGrab[k])
    // var slackResult = await slackPhoto.uploadThenBlocks(stillsToGrab[k])
  }
  var outroResult = slackPhoto.outroMessage(card, stillsToGrab);
  // . . . can this be edited to update with voting info?
  console.log("done grabbing stills");
  console.log("done outer loop");
}
