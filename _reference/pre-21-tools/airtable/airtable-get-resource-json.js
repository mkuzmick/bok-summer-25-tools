// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var airtableTools = require('./airtable-tools');

module.exports = async function(req, res, next) {
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  // var theFindByValueResult = await airtableTools.findByValue(req.body.user_id, "SlackID", "People", base);
  var allTheStuff = await airtableTools.findManyByValue({
    // field: "",
    // value: "U0HTZUUP4",
    table: "Resources",
    maxRecords: 20,
    base: base,
    view: "Grid view",
    field: "Tags",
    value: req.params.id
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
