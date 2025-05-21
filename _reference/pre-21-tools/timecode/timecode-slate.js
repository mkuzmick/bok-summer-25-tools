var moment = require('moment');
// need moment Tz?
var at = require('../airtable/airtable-tools');
var probe = require('../ffmpeg/ffprobe-to-json');
var ingestCard = require('../ingest/ingest-card');
var mk = require('../mk/utilities');
var TimecodeSlate = require('../constructors/airtable-timecode-slate');
var timecodeTools = require('./timecode-tools');
var airtableTools = require('../airtable/airtable-tools');
var Airtable = require('airtable');

module.exports = async function(folder, options){
  console.log("starting timecodeSlate function with " + folder);
  options.randomStills = false;
  var cardData = await ingestCard(folder, options);
  mk.purple(cardData);
  console.log("let's find the values we need for the slate operation");
  mk.cyan('cardData.clips[0].stats.atime', cardData.clips[0].stats.atime);
  mk.cyan('cardData.clips[0].stats.mtime', cardData.clips[0].stats.mtime);
  mk.cyan('cardData.clips[0].stats.ctime', cardData.clips[0].stats.ctime);
  mk.cyan('cardData.clips[0].stats.birthtime', cardData.clips[0].stats.birthtime);
  mk.orange('cardData.clips[0].ffprobeData.format.tags.creation_time', cardData.clips[0].ffprobeData.format.tags.creation_time);
  mk.orange('cardData.clips[0].ffprobeData.streams[0].tags.creation_time', cardData.clips[0].ffprobeData.streams[0].tags.creation_time);
  mk.orange('cardData.clips[0].ffprobeData.streams[0].tags.timecode', cardData.clips[0].ffprobeData.streams[0].tags.timecode);
  var timecodeSlate = new TimecodeSlate(cardData);
  // mk.yellow("timecodeSlate", timecodeSlate);
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_INGEST_BASE);
  var airtableResult = await airtableTools.sendToAirtable(timecodeSlate, base, "TimecodeSlates");
  mk.purple("airtableResult", airtableResult);
}
