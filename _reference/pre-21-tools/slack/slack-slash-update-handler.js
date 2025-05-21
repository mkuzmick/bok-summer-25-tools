// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var moment = require('moment');
var airtableTools = require('../airtable/airtable-tools')

module.exports = async function(req, res, next) {
  console.log('got slack-slash-update post request:');
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  var personResult = await airtableTools.findOneByValue({
    field: "SlackID",
    value: req.body.user_id,
    table: "People",
    base: base
  });
  console.log("got the Slash request from " + JSON.stringify(personResult, null, 4));
  // console.log(JSON.stringify(req.body, null, 4));
  // bit by bit remove the placeholders with more interesting stuff.
  if (personResult) {

    var thePersonRecordId = personResult.id
  } else {
    var thePersonRecordId = process.env.DEFAULT_UPDATE_USER;
  }
  console.log("defining thePersonRecordId as " + thePersonRecordId);
  var theRecordToSend = {
    Headline: req.body.text,
    Start: moment(),
    // if goal, stop end of week
    // if update, default length of an hour ending with post time?
    Stop: moment().endOf('week'),
    bySlackID: req.body.user_id,
    MediaLink: 'https://i.ytimg.com/vi/Cja6OAvKJ1M/maxresdefault.jpg',
    MediaCredit: 'NA',
    MediaCaption: "placeholder",
    People: [ thePersonRecordId ],
    Type: "Goal"
  }
  console.log("sending this to AT");
  console.log(JSON.stringify(theRecordToSend, null, 4));
  // handle the record by adding all required fields
  var theRecordResult = await airtableTools.sendToAirtable(theRecordToSend, base, 'Updates');
  console.log(theRecordResult);
  res.send("sending this headline to Airtable:\n'"
    + req.body.text
    + "\n link to the record should be here: "

  );
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}
