// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var airtableTools = require('../airtable/airtable-tools');
var moment = require('moment');
var s19 = require('../indexes/summer2019-tools');
var yargs = require('yargs');
var fs = require('fs');
var path = require('path');


module.exports = async function(req, res, next) {
  console.log('got how-to slash request');
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_TOOLS_BASE);
  var atResult = await airtableTools.findOneByValue({
    base: base,
    table: 'HowTo',
    field: 'Name',
    value: req.body.text.trim()
  });
  console.log("got at result");
  console.log(JSON.stringify(atResult, null, 4));
  if (atResult && atResult.fields.Type == "Text") {
    var message = {
      blocks: [
        s19.blx.divider(),
        s19.blx.section(atResult.fields.Message),
        s19.blx.divider()
      ]
    }
  } else if (atResult && atResult.fields.Type == "Link") {
    var message = {
      blocks: [
        s19.blx.divider(),
        s19.blx.section(`here's a link to ${atResult.fields.Title}: ${atResult.fields.Link}`),
        s19.blx.divider()
      ]
    }
  } else {
    var message = {
      unfurl_media: true,
      text: 'link: <http://www.youtube.com/watch?v=wq1R93UMqlk>'
      // blocks: [
      //   s19.blx.section(`no entry yet for req.body.text = ${req.body.text}`),
      // ]
    }
  }
  res.json(message);
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}
