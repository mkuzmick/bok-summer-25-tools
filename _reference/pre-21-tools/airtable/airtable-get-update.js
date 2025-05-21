// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var airtableTools = require('./airtable-tools');
// var recordRegex = recVEX7OdaraIrG25


module.exports = async function(req, res, next) {
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  // var theFindByValueResult = await airtableTools.findByValue(req.body.user_id, "SlackID", "People", base);
  var allTheStuff = await airtableTools.findManyByFormula({
    // field: "",
    // value: "U0HTZUUP4",
    table: "Updates",
    maxRecords: 1,
    base: base,
    view: "Grid view",
    formula: `{UpdateID} = "${req.params.id}"`
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
  if (allTheStuff.length !== 0) {
    res.render('json', {
      title: "json output",
      message: "from test-function",
      data: allTheStuff
    });
  } else {
    res.render('json', {
      title: "that's too bad",
      message: "looks like you didn't find anything",
      data: allTheStuff
    });
  }

}
