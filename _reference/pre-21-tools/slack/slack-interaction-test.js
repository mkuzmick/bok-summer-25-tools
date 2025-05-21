const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const Airtable = require('airtable');
const s19 = require('../indexes/summer2019-tools');
const request = require('request');
const fs = require('fs');

module.exports = async function(req, res, next) {
  console.log('got interaction test:');
  var payload = JSON.parse(req.body.payload);
  console.log(`++++++++++++interaction test payload = ${JSON.stringify(payload, null, 4)}`);
  if (payload.message.files) {
    console.log("there is a file here, and we're going to download it:");
    console.log(JSON.stringify(payload.message.files[0], null, 4));
    var normalizedName = payload.message.files[0].name.replace(" ", "_");
    var filePath = (ROOT_DIR + '/temp/' + normalizedName);
    request
      .get(payload.message.files[0].url_private)
      .on('error', function(err) {
        console.log(err)
      })
      .pipe(fs.createWriteStream('./test.jpg'));
  }
  var slackMessage = {
    token: process.env.SLACK_BOT_TOKEN,
    text: `got an interaction test:`,
    as_user: false,
    blocks: [
      s19.blx.divider(),
      s19.blx.jsonString('req.body for interaction test', req.body),
      s19.blx.divider(),
      s19.blx.jsonString('payload', payload)
    ],
    channel: process.env.SUMMER2019_LOGS_SLACK_CHANNEL

  }
  res.sendStatus(200);

  web.chat.postMessage(slackMessage).catch(err=>{console.error("there was an error\n" + err);})

}
