const { App } = require('@slack/bolt');
var path = require('path');

global.ROOT_DIR = path.resolve(__dirname);

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

const llog = require('./src/ll-modules/ll-utilities/ll-logs')

// const handleEvents = require('./src/ll-bots/the-pumpkin-bot/handle-events')
// const handleMessages = require('./src/ll-bots/the-pumpkin-bot/handle-messages')

const { noBotMessages } = require('./src/ll-modules/ll-slack-tools/middleware')


const messageHandler = require('./src/ll-bots/index-bot/message-handler.js');
const eventHandler = require('./src/ll-bots/index-bot/event-handler.js');
const slashHandler = require('./src/ll-bots/index-bot/slash-handler.js');
const shortcutHandler = require('./src/ll-bots/index-bot/shortcut-handler.js');
const actionHandler = require('./src/ll-bots/index-bot/action-handler.js');
const handleSlateViewSubmission = require('./src/ll-bots/slate-bot/handle-slate-view-submission');


const logRe = /^log/;
const everything = /.*/

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000
  });

app.message('hello', messageHandler.hello);
app.message(/.*/, messageHandler.parseAll);

app.command('/switch', slashHandler.switch);
app.command('/a8ksync', slashHandler.a8ksync);
app.command('/macro', slashHandler.macro);
app.command('/atembuttons', slashHandler.atemButtons)
app.command('/log', slashHandler.log);
app.command('/slate', slashHandler.slate);
app.command('/getstills', slashHandler.hundredStills)

app.command('/studiostartup', slashHandler.studioStartup)
app.command('/hub', slashHandler.hub)

app.event("file_shared", eventHandler.fileShared);
app.event("reaction_added", eventHandler.reactionAdded);
app.event("reaction_removed", eventHandler.reactionRemoved);
app.event('pin_added', eventHandler.pinAdded);
app.event('pin_removed', eventHandler.pinRemoved);
app.event('app_home_opened', eventHandler.appHomeOpened);
// app.event('message', eventHandler.message);
app.event(/.*/, eventHandler.log);

app.action(everything, actionHandler.log)
app.action(/atem/, actionHandler.atemButtons)
app.action(logRe, actionHandler.liveLogger);

app.view(/slate_submission/, handleSlateViewSubmission)


app.shortcut(`show_your_work`, shortcutHandler.showYourWork);
app.shortcut(`send_me_markdown`, shortcutHandler.sendMeMarkdown);
// app.shortcut(/.*/, shortcutHandler.log);

(async () => {
  llog.magenta(`starting app in ${process.env.NODE_ENV} mode`)
  await app.start(process.env.PORT || 3000);
  try {
    await app.client.chat.postMessage({
      channel: process.env.SLACK_TESTS_CHANNEL,
      text: "starting up the simple-slack app"
    })
  } catch (error) {
    console.error(error)
  }
  console.log('⚡️ Bolt app is running! on port', (process.env.PORT || 3000));
})();

