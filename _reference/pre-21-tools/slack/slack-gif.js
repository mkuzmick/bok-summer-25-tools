const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const s19 = require('../indexes/summer2019-tools');

module.exports = async function (message, channel) {
  var blocks = [];
  console.log("processing message");
  console.log(JSON.stringify(message, null, 4));
  if (Array.isArray(message)) {
    console.log("message is an array");
    for (var i = 0; i < message.length; i++) {
      if (typeof(message[i]) === "string") {
        console.log(`element ${i} is a string`);
        blocks.push(s19.blx.section(message[i]), s19.blx.divider());
      } else {
        console.log(`element ${1} is an object`);
        blocks.push(s19.blx.jsonString("json:", message[i]), s19.blx.divider());
      }
    }
  } else if (typeof(message) === "object") {
    blocks.push(s19.blx.jsonString(message));
  } else if (typeof(message) === "string") {
    blocks.push(s19.blx.section(message));
  }
  console.log("about to slack to channel " + channel);
  console.log("these blocks:");
  console.log(JSON.stringify(blocks, null, 4));
  web.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    text: `new message`,
    as_user: false,
    blocks: blocks,
    channel: channel
  }).catch(err=>{console.error("there was an error\n" + err);})
}
