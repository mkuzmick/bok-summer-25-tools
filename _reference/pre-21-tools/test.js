// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var s19 = require('./indexes/summer2019-tools');
var yargs = require('yargs');
var fs = require('fs');
var path = require('path');


module.exports = async function(req, res, next) {
  console.log('got macsetup slash request');
  var macsetupNotes = fs.readFileSync(path.join(ROOT_DIR, '/documentation/modules/macsetup-for-slack.md'), 'utf8');
  console.log(JSON.stringify(macsetupNotes, null, 4));
  console.log(`.env test.  Is S3_THESHOW_BUCKET ${process.env.S3_THESHOW_BUCKET}?`);
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}
