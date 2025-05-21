const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const s19 = require('../indexes/summer2019-tools');

module.exports = async function (blocks, channel) {
  web.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    text: `new message`,
    as_user: false,
    blocks: blocks,
    channel: channel
  }).catch(err=>{console.error("there was an error\n" + err);})
}
