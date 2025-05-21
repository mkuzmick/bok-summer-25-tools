// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var airtableTools = require('../airtable/airtable-tools');
var s19 = require('../indexes/summer2019-tools');

module.exports = async function(req, res, next) {
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  // var theFindByValueResult = await airtableTools.findByValue(req.body.user_id, "SlackID", "People", base);
  var allTheStuff = await airtableTools.findManyByFormula({
    // field: "",
    // value: "U0HTZUUP4",
    table: "Updates",
    maxRecords: 20,
    base: base,
    view: "Grid view",
    formula: 'IS_AFTER({Stop}, TODAY())'
  });
  var theImportantData = allTheStuff.map(record=>{
    return {
      UpdateID: record.fields.UpdateID,
      LLPeopleName_plaintext: record.fields.LLPeopleName_plaintext,
      Start: record.fields.Start,
      Stop: record.fields.Stop,
      Headline: record.fields.Headline,
      Text: record.fields.Text
    }
  });
  s19.slackSimply(
    [
      "the airtable data we just got",
      theImportantData
    ],
    process.env.SUMMER2019_LOGS_SLACK_CHANNEL
  );
  res.render('json', {
    title: "json output",
    message: "from test-function",
    data: theImportantData
  });
}
