const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const s19 = require('../indexes/summer2019-tools');
const yargs = require('yargs');
var Airtable = require('airtable');

module.exports = async function (data){
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
    web.chat.postMessage({
      text: `got it <@${data.event.user}> -- I'm going to save this to Airtable, so don't say anything too crazy`,
      channel: data.event.channel
    })
  var newRecord = {
    SlackEventTs: data.event.event_ts,
    UserSlackId: data.event.user,
    Text: data.event.text
  }
  if (/--/g.test(data.event.text)) {
    console.log("yargs-based structure");
    var theYargs = yargs.parse(data.event.text);
    newRecord.Json = JSON.stringify(theYargs);
  }
  var atResult = await s19.airtableTools.sendToAirtable(newRecord, base, "botDmLog");
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ sent DM to at: " + newRecord.Text);
}
