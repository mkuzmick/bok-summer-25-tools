---
tags: mk, summer, resources
---

# mk-resource-summer-22-bot-instructions

All the following will be based on [this](https://slack.dev/bolt-js/tutorial/getting-started) resource (head over there for more detail on the following steps).

## creating a repo for a new node.js project

Create a new repository on github, then clone to your machine with 

```
git clone URL_FOR_YOUR_REPOSITORY
```

Get into your project folder, then initialize your node.js project:

```
cd PATH_TO_YOUR_PROJECT
npm init
```
Just go with most of the defaults.

Now install `dotenv` and `@slack/bolt`:

```
npm i dotenv
npm i @slack/bolt
```

Then create a `.env` file at the root of your project and make of list of the environment variables you'll need to collect from Slack:

```
SLACK_SIGNING_SECRET=
SLACK_BOT_TOKEN=xoxb-
SLACK_APP_TOKEN=xapp-
```

We'll work on collecting those in the next segment.


## getting started on the Slack side

[Create a new Slack app](https://api.slack.com/apps/new).

Let's use a manifest this time. Find an app you like and duplicate its manifest, then tweak it and use it to start the new app.

```
display_information:
  name: ll-summer-22-bot
  description: ll summer experiments
  background_color: "#212224"
features:
  app_home:
    home_tab_enabled: true
    messages_tab_enabled: false
    messages_tab_read_only_enabled: false
  bot_user:
    display_name: ll-summer-22-bot
    always_online: false
  shortcuts:
    - name: save this somewhere
      type: message
      callback_id: save_this_somewhere
      description: saves this for the summer anyway
  slash_commands:
    - command: /s22
      description: launches summer test
      usage_hint: "[args]"
      should_escape: false
oauth_config:
  scopes:
    user:
      - files:read
      - files:write
      - channels:history
      - channels:read
      - chat:write
      - emoji:read
      - links:read
      - links:write
      - pins:read
      - pins:write
      - reactions:read
      - reactions:write
      - search:read
      - reminders:write
      - reminders:read
    bot:
      - channels:read
      - chat:write
      - files:read
      - files:write
      - im:history
      - im:write
      - im:read
      - pins:read
      - pins:write
      - reactions:read
      - reactions:write
      - reminders:read
      - reminders:write
      - channels:history
      - commands
      - links:read
      - groups:history
      - mpim:history
settings:
  event_subscriptions:
    user_events:
      - file_change
      - file_created
      - file_deleted
      - file_public
      - file_shared
      - file_unshared
    bot_events:
      - app_home_opened
      - file_change
      - file_created
      - file_deleted
      - file_public
      - file_shared
      - file_unshared
      - link_shared
      - message.channels
      - message.groups
      - message.im
      - message.mpim
      - pin_added
      - pin_removed
      - reaction_added
      - reaction_removed
  interactivity:
    is_enabled: true
  org_deploy_enabled: false
  socket_mode_enabled: true
  token_rotation_enabled: false

```
or some such.

Then basic starter code for `app.js`

```
const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  console.log(`connecting with `)
  
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
```

Enter `npm run dev` in terminal, then hop over to slack and invite the bot to a channel. If you say "hello" it should respond.

## setting up the main slash command

Let's set up a slash command that receive some basic arguments so that you can use it for developing a bunch of different ideas. Essentially we want to be able to enter arguments just as we would in the command line:

```
/slash --name "my name" --print "thing-to-print" etc.
```

So we'll grab the text that follows the slash and parse it the way we would command line arguments. In the manifest above we set up a slash command for `/s22`, but if you didn't use that manifest you'll want to add a slash command manually.

```
app.command('/s22', async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
    let result = yargs(command.text).parse()
    await respond(`here you go:\n${JSON.stringify(result, null, 4)}`);
});

```

