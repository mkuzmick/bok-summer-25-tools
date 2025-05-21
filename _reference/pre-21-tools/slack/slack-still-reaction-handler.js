var s19 = require('../indexes/summer2019-tools');
var airtableTools = require('../airtable/airtable-tools');
var Airtable = require('airtable');
var AirtableStillReaction = require('../constructors/airtable-still-reaction');


var slackStillReactionHandler = async function (payload) {
  if (payload.event.reaction != "camera") {
    var base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_INGEST_BASE);
    console.log("++++++++++ launching slackStillReactionHandler +++++++++++++");
    try {
      var stillRecord = await findStillByTs(payload.event.item.ts, base);
      var stillReaction = new AirtableStillReaction(payload, stillRecord);
      console.log("new StillReaction");
      console.log(JSON.stringify(stillReaction, null, 4));
      var atResult = await stillReactionToAirtable(stillReaction, base);
      console.log("done sendToAirtable?");
      await s19.slackSimply(`found the still for ts ${payload.event.item.ts} that got a :${payload.event.reaction}: on airtable. Here is the JSON: \n${JSON.stringify(stillRecord)}`, process.env.SLACK_LOG_OF_OPERATIONS_CHANNEL);
    } catch (e) {
      console.log("error in the slackStillReactionHandler:", e);
    } 
  } else {
    console.log("initial camera emoji added as placeholder");
  }
}

async function findStillByTs(slackTs, base){
  console.log("looking for still with slackTs " + slackTs);
  theRecords = [];
  await base("Stills").select(
    {
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `SlackTs='${slackTs}'`
    }
  ).eachPage(function page(records, next){
    console.log("got a record");
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  console.log("returning records");
  console.log(JSON.stringify(theRecords[0]));
  return theRecords[0];
}

async function stillReactionToAirtable(record, base){
  console.log("launching stillReactionToAirtable");
  var srResult = await base('StillReactions').create(record)
    .then(data => {
      console.log("saved this STILLREACTION to AT");
      console.log(JSON.stringify(data, null, 4));
      return data;
    })
    .catch(err => {return "there was an error: " + err})
  return srResult;
}

module.exports = slackStillReactionHandler;
