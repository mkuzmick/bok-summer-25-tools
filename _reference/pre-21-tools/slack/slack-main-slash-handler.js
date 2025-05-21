// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var s19 = require('../indexes/summer2019-tools');
var yargs = require('yargs');

module.exports = async function(req, res, next) {
  console.log('got s19 slash request');
  var theYargs = yargs.parse(req.body.text);
  var message = {
    blocks: [
      s19.blx.section('got an s19 slash command'),
      s19.blx.divider(),
      s19.blx.jsonString('req.body', req.body),
      s19.blx.divider(),
      s19.blx.jsonString('yargs', theYargs),
      s19.blx.divider(),
      s19.blx.section("and that's all for now")
    ]
  }
  res.json(message);
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}
