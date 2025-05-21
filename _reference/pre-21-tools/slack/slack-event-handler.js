const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const s19 = require('../indexes/summer2019-tools');
const slackLog = process.env.SUMMER2019_LOGS_SLACK_CHANNEL;
const slackStillReactionHandler = require('./slack-still-reaction-handler');
const slackFindMessage = require('./slack-find-message');
var Airtable = require('airtable');

module.exports = function (req, res, next) {
  var theSlackPayload = req.body;
  if (req.body.challenge) {
    res.send(req.body.challenge)
  } else if (req.body.event.type=="app_mention" && req.body.event.subtype !== "bot_message") {
    console.log("just got an event: " + JSON.stringify(req.body, null, 4));
    console.log(`was just mentioned by user ${req.body.event.user}`);
    res.sendStatus(200);
    if (/youtube/ig.test(req.body.event.text)) {
      web.chat.postMessage({
        text: `got it <@${req.body.event.user}>, and it looks like a youtube link maybe?`,
        channel: req.body.event.channel
      })
    } else {
      web.chat.postMessage({
        text: (`got it <@${req.body.event.user}>\n${JSON.stringify(req.body, null, 4)}`),
        channel: req.body.event.channel
      })
    }
  } else if (req.body.event.type=="message" && req.body.event.channel_type == "im" && req.body.event.subtype !== "bot_message") {
    console.log("got a dm from user " + req.body.event.user);
    console.log(JSON.stringify(req.body, null, 4));
    res.sendStatus(200);
    var dmData = req.body;
    s19.slackHandleSummer2019Dm(dmData);
  } else {
    res.sendStatus(200);
    handleSlackEventPayload(theSlackPayload);
    console.log("got a request that wasn't app_mention:\n" + JSON.stringify(theSlackPayload, null, 4));
  }
}

async function handleSlackEventPayload(payload){
  var base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  console.log("handling this slack payload:");
  console.log(JSON.stringify(payload, null, 4));
  if (payload.event.type=="reaction_added") {
    console.log("!!!!!!!! looks like we got a reaction !!!!!!!!");
    // var originalMessage = await slackFindMessage({channel: payload.event.item.channel, ts: payload.event.item.ts});
    var originalMessage = await web.conversations.history({
      channel: options.channel,
      latest: options.ts,
      count: 1,
      inclusive: true
    });

    if (originalMessage.messages) {
      console.log("!!!!!!!!");
      console.log(`message ${originalMessage.messages[0]}`);
      console.log("!!!!!!!!");
    }// console.log(JSON.stringify(payload, null, 4));
    if (payload.event.reaction=="rocket" && payload.event.user==process.env.SLACK_MK_ID) {
      await s19.slackSimply(`got that rocket <@${process.env.SLACK_MK_ID}> = ${JSON.stringify(payload)}`, process.env.SUMMER2019_LOGS_SLACK_CHANNEL);
    }
    if (payload.event.reaction=="wheelofbrie" && payload.event.user==process.env.SLACK_MM_ID) {
      await s19.slackSimply(`another wheel of brie (:wheelofbrie:) from <@${process.env.SLACK_MM_ID}>!  We will add a count next.`, process.env.SUMMER2019_LOGS_SLACK_CHANNEL);
    }
    if (payload.event.item.channel == process.env.SUMMER2019_SLACK_CHANNEL) {
      await s19.slackSimply(`got emoji in summer2019: :${payload.event.reaction}:. Here is the JSON: \n${JSON.stringify(payload)}`, process.env.SUMMER2019_LOGS_SLACK_CHANNEL);
    } else if (payload.event.item.channel == process.env.SLACK_LOG_OF_OPERATIONS_CHANNEL) {
      console.log("log of operations still test");
      await slackStillReactionHandler(payload);
    } else if (payload.event.item.channel == process.env.SLACK_PHOTOS_CHANNEL) {
      await slackStillReactionHandler(payload);
    } else if (payload.event.item.channel == process.env.SLACK_PHOTO_REVIEW_CHANNEL) {
      console.log("=================================");
      console.log("launch slackStillReactionHandler");
      await slackStillReactionHandler(payload);
    } else {
      console.log(payload.event.item.channel + " isn't one we're tracking");
      web.chat.postMessage({
        text: (`got that :${payload.event.reaction}: emoji: \n${JSON.stringify(payload)}`),
        channel: process.env.SUMMER2019_LOGS_SLACK_CHANNEL
      })
    }
    if (payload.event.user) {
      var userNameInfo = await s19.airtableTools.findOneByValue(
        {
          base: base,
          field: "SlackID",
          value: payload.event.user,
          table: "People"
        }
      )
      // console.log(`userNameInfo = ${userNameInfo}`);
      if (!userNameInfo) {
        var llPeopleName = "no LLPeopleName yet"
      }
      else if (userNameInfo && userNameInfo.fields.LLPeopleName) {
        var llPeopleName = userNameInfo.fields.LLPeopleName
      }
    } else {
      var llPeopleName = "bot"
    }
    // console.log("+++++++++++++++++++++\n" + JSON.stringify(userNameInfo, null, 4));
    var reactionEvent = {
      SlackEventTs: payload.event.event_ts,
      ReactionType: payload.event.reaction,
      UserSlackId: payload.event.user ? payload.event.user : "bot",
      UserName: llPeopleName,
      Channel: payload.event.item.channel,
      ItemTs: payload.event.item.ts,
      ItemType: payload.event.item.type,
      ItemChannel: payload.event.item.channel,
      ItemUser: payload.event.item_user ? payload.event.item_user : "bot",
      EventTime: `${payload.event_time}`,
      EventId: payload.event_id,
      AuthedUsers: payload.authed_users.join(","),
      RelatedAction: 'log to Airtable'
    }
    console.log("going to send this to Airtable:");
    console.log(JSON.stringify(reactionEvent));
    var atResult = await s19.airtableTools.sendToAirtable(reactionEvent, base, "ReactionLog");
    s19.slackSimply(`Sent to AT:${JSON.stringify(atResult)}`, slackLog);
  }
}
