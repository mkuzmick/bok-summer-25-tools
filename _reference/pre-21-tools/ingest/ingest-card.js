var mk = require('../mk/utilities');
var fs = require('fs');
var airtableTools = require('../airtable/airtable-tools');
var path = require('path');
var Card = require('../constructors/card');
var Clip = require('../constructors/clip');
var AirtableClip = require('../constructors/airtable-clip');
var AirtableCard = require('../constructors/airtable-card');
var AirtableRawStill = require('../constructors/airtable-raw-still');
var mk = require('../mk/utilities');
var moment = require('moment');
var checkForShootOnAt = require('./check-for-shoot-on-at');
var simpleFfprobe = require('../ffmpeg/ffprobe-to-json');
var getRandomStills = require('./get-random-stills');
var getThreeStills = require('./get-three-stills');
var videoRegex = /(\.mov|\.mp4|\.m4v|\.mts|\.mxf)$/i;
var stillRegex = /(\.cr2|\.jpg|\.jpeg)$/i;
var audioRegex = /(\.aiff|\.mp3|\.aif|\.wav)$/i;
var stillFolderRegex = /(still|stills)$/i;
var audioFolderRegex = /(audio|h6|h1|l12)$/i;
var getPhotoMetadata = require('../photolab/get-photo-metadata');
var checkExtensions = require('./check-extensions');

module.exports = async function(cardFolder, options){
  console.log("ingesting card from " + cardFolder + " with options");
  mk.cyan(options);
  var card = new Card(cardFolder);
  card.shootIdResult = await checkForShootOnAt(card);
  card.airtableShootRecordId = card.shootIdResult.id;
  // mk.orange('checkForShootOnAt', card.shootIdResult);
  card.clips = await getClips(cardFolder);
  // TODO: get any extra data (tc offsets, etc) from Airtable and add
  console.log(JSON.stringify(card.clips[0].ffprobeData, null, 4));
  if (stillFolderRegex.test(cardFolder)) {
    card.airtableRecords = await sendRawStillsToAirtable(card.clips);
  } else if (audioFolderRegex.test(cardFolder)) {
    console.log("audio folder--not sending to Airtable");
  } else {
    card.airtableRecords = await sendClipsToAirtable(card.clips);
    var inTcString = card.clips[0].ffprobeData.streams[0].tags.timecode ? card.clips[0].ffprobeData.streams[0].tags.timecode :
      card.clips[0].ffprobeData.streams[1].tags.timecode ? card.clips[0].ffprobeData.streams[1].tags.timecode :
      card.clips[0].ffprobeData.streams[2].tags.timecode ? card.clips[0].ffprobeData.streams[2].tags.timecode :
      "00:00:00:00";
    console.log("inTcString = " + inTcString);
    var inTcEls = inTcString.split(":");
    inTcEls.pop();
    card.dateString = card.shootId.substr(0,4)
      + "-" + card.shootId.substr(4,2)
      + "-" + card.shootId.substr(6,2)
      + "T" + inTcEls.join(":");
    card.Date = moment(card.dateString);
  }
  if (options && options.rename) {
    rename(card);
  }
  if (options && options.threeStills) {
    card.stills = await getThreeStills(card);
  }
  if (options && options.randomStills) {
    card.stills = await getRandomStills(card);
  }
  card.airtableData = await sendCardToAirtable(card);
  var pathForCardData = path.join(process.env.TESTS_FOLDER, (card.FolderId + ".json"));
  fs.writeFileSync(pathForCardData, JSON.stringify(card, null, 4));
  console.log("finally, testing ext count");
  checkExtensions(card.clips);
  return card;
}

async function getClips(folder){
  var clipNames = fs.readdirSync(folder)
  var clipPaths = [];
  for (var i = 0; i < clipNames.length; i++) {
    if (clipNames[i]!==".DS_Store" && !fs.statSync(path.join(folder, clipNames[i])).isDirectory()) {
      clipPaths.push(path.join(folder, clipNames[i]));
    }
  }
  var clips = [];
  for (var i = 0; i < clipPaths.length; i++) {
    var theClip = new Clip (clipPaths[i], path.basename(folder), (i));
    if (videoRegex.test(theClip.newName)) {
      console.log("video file: " + theClip.newName);
      theClip.ffprobeData = await simpleFfprobe(clipPaths[i]);
    } else if (stillRegex.test(theClip.newName)) {
      console.log("still: " + theClip.newName);
      theClip.exifData = await getPhotoMetadata(clipPaths[i]);
      console.log(JSON.stringify(theClip, null, 4));
    }
    clips.push(theClip);
  }
  return clips;
}

async function sendClipsToAirtable(clips){
  var airtableBase = process.env.AIRTABLE_INGEST_BASE;
  console.log(`working with base = ${airtableBase}`);
  var result = []
  for (var i = 0; i < clips.length; i++) {
    var atClip = new AirtableClip(clips[i]);
    var atResult = await airtableTools.addRecord(atClip, "VideoFiles", airtableBase);
    result.push(atResult);
  }
  return result;
}

async function sendCardToAirtable(card){
  var airtableBase = process.env.AIRTABLE_INGEST_BASE;
  var airtableCard = new AirtableCard(card);
  var atResult = await airtableTools.addRecord(airtableCard, "Cards", airtableBase);
  return atResult;
}

function rename(card){
  for (var i = 0; i < card.clips.length; i++) {
    fs.renameSync(card.clips[i].initialPath, card.clips[i].newPath);
  }
}

async function getBeginningMiddleEnd(file){
  // code for first, last, and middle stills
}

async function sendRawStillsToAirtable(stills){
  var airtableBase = process.env.AIRTABLE_INGEST_BASE;
  var result = []
  for (var i = 0; i < stills.length; i++) {
    var atStill = new AirtableRawStill(stills[i]);
    var atResult = await airtableTools.addRecord(atStill, "RawStills", airtableBase);
    result.push(atResult);
  }
  return result;
}
