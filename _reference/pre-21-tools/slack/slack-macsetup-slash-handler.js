// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var s19 = require('../indexes/summer2019-tools');
var yargs = require('yargs');
var fs = require('fs');
var path = require('path');


module.exports = async function(req, res, next) {
  console.log('got macsetup slash request');
  var theYargs = yargs.parse(req.body.text);
  var macsetupNotes = fs.readFileSync(path.join(ROOT_DIR, '/documentation/modules/macsetup-for-slack.md'), 'utf8');
  var message = {
    blocks: [
      s19.blx.section(`setting up a new mac? here's how to start`),
      s19.blx.divider(),
      s19.blx.section(macsetupNotes),
      s19.blx.divider(),
      s19.blx.section(`go ahead and log in to Github as \`code@learninglab.xyz\`, then you'll be able to see the tools repo here: ${process.env.GITHUB_REPO_URL}`)
    ]
  }
  res.json(message);
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}
