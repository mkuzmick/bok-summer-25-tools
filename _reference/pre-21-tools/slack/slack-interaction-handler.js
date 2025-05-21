const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const Airtable = require('airtable');
const s19 = require('../indexes/summer2019-tools');

module.exports = async function(req, res, next) {
  console.log('got interaction:');
  var payload = JSON.parse(req.body.payload);
  console.log(`interaction payload = ${JSON.stringify(payload)}`);

  // var interactionEvent = {
  //   Type: payload.type,
  //   UserSlackId: payload.user,
  //   UserName: payload.user.username,
  //   Name: payload.user.name,
  //   Channel: payload.channel.id,
  //   ChannelName: payload.channel.name,
  //   ActionId: payload.actions[0].action_id ? payload.actions[0].action_id : "",
  //   BlockId: payload.actions[0].block_id ? payload.actions[0].block_id : "",
  //   Tag: payload.actions[0].text.text ? payload.actions[0].text.text : "",
  //   Value: payload.actions[0].value ? payload.actions[0].value : "",
  //   ActionTs: payload.actions[0].action_ts ? payload.actions[0].action_ts : "",
  //   Container: JSON.stringify(payload.container)
  // }
  var slackMessage = {
    token: process.env.SLACK_BOT_TOKEN,
    text: `got an interaction: ${JSON.stringify(payload, null, 4)}`,
    as_user: false,
    // blocks: [
    //   s19.blx.jsonString('req.body for interaction', req.body),
    //   s19.blx.divider(),
    // ],
    channel: process.env.SUMMER2019_LOGS_SLACK_CHANNEL

  }
  res.sendStatus(200);
  web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})
  // var base = new Airtable({
  //   apiKey: process.env.AIRTABLE_API_KEY
  // }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  // // console.log("going to send this to airtable:");
  // // console.log(JSON.stringify(interactionEvent, null, 4));
  // var result = await s19.airtableTools.sendToAirtable(interactionEvent, base, "InteractionLog");
  // console.log("at result = " + JSON.stringify(result, null, 4));
}
