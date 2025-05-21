const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

module.exports = async function (options) {
  console.log("finding record with ts " + options.ts);
  // console.log(JSON.stringify(options, null, 4));
  var message = await web.conversations.history({
    channel: options.channel,
    latest: options.ts,
    count: 1,
    inclusive: true
  });
  // console.log(`found the message: ${JSON.stringify(message, null, 4)} `);
  return message;
}
