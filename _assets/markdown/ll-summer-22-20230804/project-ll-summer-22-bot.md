---
tags: projects, bots, slack
---

# project-ll-summer-22-bot

## step-by-step

just the steps, not much explanation

* `npm i @slack/bolt`
* `npm i dotenv`
* `touch .env`
* create slack app
    * add to development slack
    * first choose scopes in oauth and permissions tab
    * subscribe to events
    * turn on socket mode and create app token
    * then re-install app
* add to .env
```
SLACK_SIGNING_SECRET=etc
SLACK_BOT_TOKEN=xoxb-etc
SLACK_APP_TOKEN=xapp-etc
```



# 21-22-bot notes

Here we'll take notes as we build the 21-22 slack app. We won't be able to document literally everything as we build it, but we'll do our best. And we can add to it collectively over time.

This time around we'll try [Bolt](https://slack.dev/bolt-js/concepts) instead of the Express app from scratch method we used in the 2017-2020 zone. Let's see how it goes!

## STEP BY STEP GUIDE

well, not yet, but it will be.

### SOCKET MODE, NGROK, SERVERS, ETC

One of the challenges of developing a Slack app is that Slack needs to be able to interact with your "server," but it can get really cumbersome having to update this server constantly to test out your changes.

Some folks have tried it this way--actually spinning up a server on Heroku immediately and updating as they make changes to their code. If you do this, Heroku will give you a poetically-named URL, and you'll use `https://your.heroku.url/slack/events` as to target you type in to Slack. But this is slow, because it takes Heroku a minute or two to redeploy your app after you make changes. And while this doesn't sound like much, you can't make much progress if you need to wait for a minute or two to see every single change take effect.

A faster, more fluid option is using [ngrok](https://dashboard.ngrok.com/get-started/setup) to connect Slack to your development machine. Just
* install ngrok with `brew install ngrok`
* fire it up with `ngrok http 3000` (or other port--but 3000 is our default in this project)
* note the url it gives you back, probably something like `https://358f-23-52-28-358.ngrok.io`
* use this root url to create your slack events target url: `https://358f-23-52-28-358.ngrok.io/slack/events`

If you don't opt for the paid account, ngrok will give you a new URL every time you relaunch it (which means that you'll have to re-enter it in every single field of the Slack API Developer interface every single time). Also, you'll have to ultimately point to your actual Heroku URL once you want to actually launch the server (or AWS or Google Cloud URL or wherever you put your server). And this means you can't easily switch back and forth between ngrok-mode and heroku-mode (it makes more sense, in any case, to have a dev branch and production branch of the app--but let's not get into this now)

So there are draw-backs to both the ngrok-method and the heroku-right-away method.

In this tutorial, we're going to opt for a new option Slack offers which appears to offer us the best of both worlds. Slack's **Socket Mode** uses web sockets to achieve a connection to your machine. It gives you a very ngrok-ish developer experience, but what's great is that you can actually just go with socket-mode for the final app, which some organizations do for security reasons, and which is totally fine for us when we're making small tools we run once in a while rather than bots that we need to be listening 24/7.

Even if we want to put the thing on heroku ultimately, what's great is that you can toggle socket-mode on and off without Slack forcing you to re-enter all of your target URLs, which is really convenient.

Anyway--if you are really just starting out, this is probably extremely boring. But we thought we should explain the rationale for the method we use in these docs.


### FIRST STEPS

We won't go through setting up your entire development environment here--or even every last step of creating a new Slack app in the Slack API interface, because this hasn't changed much (though if anyone wants to add this part, that would be awesome).

But here are some initial steps you'll need to take.

* make sure you have homebrew, node, git and a code-editor installed
* make sure you have a development Slack team set up so you aren't trying everything out in your actual organization's slack
* sign in to the [Slack API site](https://api.slack.com/), go to the [Your Apps](https://api.slack.com/apps) page and create a new app (again, be sure to select your development slack rather than one of your actual organizations for now)
* create a new repo on github, selecting `node` for your `gitignore`, then clone it to your development folder on your machine
* once inside the root folder of your project, start up a new npm project with `npm init` (you can go with all the defaults for now--you can easily change everything later)
* install the Slack Bolt package with `npm i @slack/bolt`
* install `dotenv` to handle environment variables with `npm i dotenv`
* install `nodemon` to automatically restart the server every time you make changes in development with `npm i -g nodemon`
* while you're at it, create a `.env` file at the root of your project and type in the values you get from slack (we'll need the SLACK_APP_TOKEN because we're using socket mode)
    ```
    SLACK_SIGNING_SECRET=etc
    SLACK_BOT_TOKEN=xoxb-etc
    SLACK_APP_TOKEN=xapp-etc
    ```
    * NEED TO EXPLAIN HOW TO GET THESE!
* create an `app.js` file with code such as
    ```
    const { App } = require('@slack/bolt');
    require('dotenv').config()

    const app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        socketMode: true, 
        appToken: process.env.SLACK_APP_TOKEN 
    });

    app.message('hello', async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say(`Hey there <@${message.user}>!`);
    });

    (async () => {
      // Start your app
      await app.start(process.env.PORT || 3000);
      console.log('⚡️ Bolt app is running! on port', (process.env.PORT || 3000));
    })();
    ```
* you should now be able to start your app with `nodemon app.js` (and hopedully see "⚡️ Bolt app is running! on port 3000" in terminal rather than any errors)
* your app won't be able to "hear" anything coming from Slack, however, until we give it the permission to do so back in the Slack interface
    * NEED TO ADD
        * oauth scopes
            * messages
            * channels
            * groups
            * dms
            * multi-user dms
            * emojis
            * files
        * event subscriptions
            * messages
            * reactions
            * app home opened (or save for later?)
* let's break up the code into some different files to keep it manageable. Let's create an `event-handler.js` file for functions that handle the events we're subscribing to, and a `message-handler.js` file for messages. At the top of `app.js` we can add
    ```
    const messageHandler = require('./tools/message-handler.js');
    const eventHandler = require('./tools/event-handler.js');
    ```
* then we can add a bunch of different handlers in these files (we'll explain the code later--for now the point is the basic gist of splitting up the files):
    ```
    exports.hello = async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say(`Hey there <@${message.user}>!`);
    }

    exports.rocket = async ({ message, say }) => {
        await say(`thanks for the :rocket:, <@${message.user}>`);
    }
    ```
* calling them in the `app.js` like so
    ```
    app.message('hello', messageHandler.hello);
    app.message(':rocket:', messageHandler.rocket);
    ```

### WEBHOOKS

This is the simplest thing . . . very useful for simple shell scripts, etc. Just go to the "Webhooks" tab and create a new webhook that points at your chosen channel. Then paste the `curl` sample code into your shell. It will look something like this:

```
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/XXXXXXXX/XXXXXXXXXX/XXXXXXXXXXXXXXXXX
```

This is useful for sending messages and simple notifications that get spawned by other shell scripts. Like if you are ingesting or transcoding a bunch of media and want to know when it's done. Or if you want to send yourself a programmatically generated chunk of text (perhaps something from an Airtable script, say).


### SLASH COMMANDS

Next up is the Slash Command. 

For our first command, let's create a tool that allows users to ask for a "How To" doc that has instructions on completing some sort of basic LL task.

In the Slack interface, create a new slash command by
1. clicking the Slash Commands tab and then "Create New Command" on the Slash Commands page
2. typing "howto" into the "Command" box
3. typing "learn how to do the thing" into the "Short Description" field
4. typing "the thing" into the "Usage Hint" field. This will help users understand that if they want to learn "How to do tulle bows" they should type `/howto tulle bows` into the Slack interface
5. if you are using socket mode, just go ahead and click save--if you are using HTTP mode, you'll need to enter the `https://yourwebsite.com/slack/events` URL in first

Now let's make sure we're listening for this slash command over in our Bot App. In `app.js` set up the connection between this slash command and the function you want to fire when you hear it being invoked by a user. We're going to store the slash-handling code in a separate file to stop our `app.js` file from becoming overwhelming, we'll add these two lines to `app.js`, one at the top and one further down:
```
// at the top with all the other requires
const slashHandler = require('./utils/slash-handler.js')

// further down add in your various slash handlers
app.command('/howto', slashHandler.howto);
app.command('/othercommand', slashHandler.othercommand);
// etc
```

Then here's what we'll do in that `slash-handler.js`:

```
exports.howto = async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
    // and respond
    await respond(`got a command: ${JSON.stringify(command, null, 4)}`);
}
```
We are acknowledging that we received the request with `ack()` and then responding. For now we're sending back the JSON because this is going to help us grasp the structure of all the data we have to work with.

Launch your app and try it out. Hopefully you get back something like this:

```
got a command: {
   "token": "XXXXXXXXXXXXXXXXXXX",
   "team_id": "XXXXXXXXXX",
   "team_domain": "learninglab-dev",
   "channel_id": "XXXXXXXXXX",
   "channel_name": "directmessage",
   "user_id": "XXXXXXX",
   "user_name": "marlon",
   "command": "/howto",
   "text": "coffee",
   "api_app_id": "XXXXXXXXX",
   "is_enterprise_install": "false",
   "response_url": "https://hooks.slack.com/commands/XXXXX",
   "trigger_id": "XXXXXXXXXXXXXXXXXXXX"
}
```
This is the data we're going to use in the next steps to accomplish more interesting stuff. For now if you're just learning all of this, try formatting a response that uses a couple of the values to say something (like maybe personalizing the response with `user_name`).


### SIDE QUEST: AIRTABLE

Things will be more interesting if we connect this app to some data (otherwise our responses can only get so interesting).

Let's respond to that slash command we're listening for with some data from Airtable. For now, we'll use a really simple table of instructions for simple LL tasks. Let's call it `HowTos` and have each `HowTo` have the following structure
```
Name: String (will be the title)
Text: Markdown (the actual instructions)
ImageLink: URL (will be a link to any relevant image)
```
[INSERT SAMPLE DATA]

You can use any other base you already have up and running, but these will be the words we'll be using in this walk-through.

First install airtable with `npm i airtable` and hop over to the [api docs](https://airtable.com/api) to refer to them as you write your code.

The first query we're going to build will find some number of records that have a specific value for a given field. In our case, 
1. we'll have users type in the command `/howto do something`
2. the string `"do something"` will show up in `command.text` and we'll search for the `HowTo` record that has the Name `"do something"`
3. we'll send the Airtable data back to the user in Slack (first as JSON, then as a more elegantly formatted message)

We completed step 1 above, but just to remind you, we have something like the following working now in our `slash-handler.js` file:

```
exports.howto = async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
    // and respond
    await respond(`got a command: ${JSON.stringify(command, null, 4)}`);
}
```
We're going to want to do talk to Airtable between the `ack()` and the `respond()` so that our response can include the info we have stored on Airtable. Once again, we're going to split some of our code into different files to keep things clean and reusable. In this case, we're going to create a file called `airtable-utilities.js` that holds a bunch of methods for interacting with Airtable, and we'll create a function there called `findByValue` that we'll call right between the `ack()` and the `respond()`. We'll need to pass this function some key information: 
- the ID of the base we're contacting
- the name of the Table we're accessing
- the maximum number of records we want to get back (in this case just 1)
- the name of the View we want to use
- the field/value pair we're looking for (in this case, we want to look for a record that has a specific value for "Name")

So let's head back to our `howto` handler and `await` a response from our `findByValue` function before we respond to our user (this won't work just yet, because we still need to create our `airtableUtilities.findByValue` method, but we had to write one of the files first!)

```
const airtableUtilities = require('./airtable-utilities')

exports.howto = async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
    const result = await airtableUtilities.findByValue({
        baseId: process.env.AIRTABLE_BOT_BASE_ID,
        table: "HowTos",
        maxRecords: 1,
        view: "MAIN",
        field: "Name",
        value: command.text
    })
    await respond(`got the text: ${command.text} from command:\n${JSON.stringify(command, null, 4)}\ngot result from Airtable:\n${JSON.stringify(result, null, 4)}`);
}
```
Again, this won't work yet because we need to actually create our `airtableUtilities.findByValue` function. So in the `airtable-utilities.js` file (or whatever you chose to call it) let's do something like this:

```
module.exports.findByValue = async function(options) {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(options.baseId);
    theRecords = [];
    await base(options.table).select(
      {
        maxRecords: options.maxRecords ? options.maxRecords : 10,
        view: options.view ? options.view : "MAIN",
        filterByFormula: `${options.field}='${options.value}'`
      }
    ).eachPage(function page(records, next){
      theRecords.push(...records);
      next()
    })
    .catch(err=>{console.error(err); return})
    return theRecords;
}
```

Now, you'll notice that the two methods above are referencing some new environment variables: `process.env.AIRTABLE_API_KEY` and `process.env.AIRTABLE_BOT_BASE_ID`, so you'll need to find the relevant values in the Airtable API interface and add them to your `.env` file (note: some of what we're putting in the `.env` is info you would typically store in a database if your app had many users, but since we're making an app that's just for your organization, we'll save ourselves this step in this project).

At this point (assuming your using nodemon and your server automatically restarted) you should be able to type `/howto do something` into Slack and get a response (assuming that "do something" is the `Name` value for an existing record in your Airtable base)

You should get back a response that looks something like this:

```
got result from Airtable:
[
   {
       "_table": {
           "_base": {
               "_airtable": {},
               "_id": "appXXXXXXXXXXXX"
           },
           "id": null,
           "name": "HowTos"
       },
       "id": "recaklsjdhfalsjdfhla",
       "_rawJson": {
           "id": "recahusdfoashdfo9i",
           "fields": {
               "Notes": "# SETTING UP A NEW MAC\n\nHere would be some instructions:\n\n* they'll be in markdown\n* we'll see if that translates.",
               "Name": "macsetup",
               "ImageLink": "https://www.apple.com/newsroom/images/product/imac/standard/apple_new-imac-spring21_hero_04202021_Full-Bleed-Image.jpg.large.jpg"
           },
           "createdTime": "2021-10-24T12:29:04.000Z"
       },
       "fields": {
           "Notes": "# SETTING UP A NEW MAC\n\nHere would be some instructions:\n\n* they'll be in markdown\n* we'll see if that translates.",
           "Name": "macsetup",
           "ImageLink": "https://www.apple.com/newsroom/images/product/imac/standard/apple_new-imac-spring21_hero_04202021_Full-Bleed-Image.jpg.large.jpg"
       }
   }
]
```
So it's looking like the info we want is there in "fields": 

* `result.fields.Notes`
* `result.fields.Name`
* `result.fields.ImageLink`

These are the values that will help us build our message. We're going to wait a bit to learn about message formatting with the Blocks API, but if you just can't wait to make this response more useful, try wiping out all of the unnecessary JSON responses and just sending back the relevant text (maybe just the `Name` and the `Notes`?).

### EVENTS

Let's listen for a few events.

1. get the necessary scopes enabled in the oauth and permmissions tab (messages, users, channels, files, etc)
2. subscribe to your events in the events tab (messages and reactions are good places to start)
3. add the listeners with empty functions for now
    ```
    app.message('hello', messageHandler.hello);
    app.message(':rocket:', messageHandler.rocket);
    
    app.event('reaction_added', eventHandler.reaction_added);
    app.event('app_home_opened', eventHandler.app_home_opened);
    // etc
    ```
4. then add your message handlers
    ```
    exports.hello = async ({ message, say }) => {
        await say(`Hello to you too, <@${message.user}>!`);
    }

    exports.rocket = async ({ message, say }) => {
        await say(`thanks for the :rocket:, <@${message.user}>`);
    }
    ```
    and your event handlers
    ```
    exports.reaction_added = async ({ event, client }) => {
      try {
        console.log(`got a reaction_added event: \n${JSON.stringify(event, null, 4)}`);
        if (event.reaction == "rocket") {
          rocketHandler({ event, client })
        } else if (event.reaction == "rainbow") {
          rainbowHandler({ event, client })
        } else {
            const result = await client.chat.postMessage({
              channel: event.item.channel,
              text: `got a :${event.reaction}:. We don't have a handler for that yet.`
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
    ```

### ANOTHER AIRTABLE DETOUR

Let's take this opportunity to add another method to our `airtable-utilities.js` file. Let's store each of the `rocket` events we hear in an Airtable table of Rockets. 

We'll need to think a little bit about what fields we want to add. We could just add ALL the JSON for the event and try to figure it out later . . . but it's probably better to think a bit now about what fields we want to keep track of (along with any additional information we want to generate or transformations we want to perform on the data) as we start. Because once we set the pattern for programmatically logging things to the database it's hard to change (though let's still dump all the JSON somewhere in case we DO want to change things later!)

So, for starters, let's look at the structure of what we get from Slack when a reaction event happens.

```
{
   "type": "reaction_added",
   "user": "U123ABCD",
   "item": {
       "type": "message",
       "channel": "C123WXYZ",
       "ts": "1635024238.000200"
   },
   "reaction": "rocket",
   "item_user": "U4567ABC",
   "event_ts": "1635091382.001300"
}
```
This isn't actually that interesting on its own. We know 
* it's a rocket event
* it was added by user `U123ABCD`
* it was added at timestamp `1635091382.001300`
* it was added to a `message` item
* that message item was created by `U4567ABC`
* it was created in channel `C123WXYZ`
* it was created at timestamp `1635024238.000200`

This is definitely a lot of info---and it's definitely enough info to track down the reaction and the message it was added to, but don't we actually want to SEE this message and its contents? and don't we maybe want the users' names rather than just their IDs, etc?

One potential use case here involves adding an emoji to a post to say "this is awesome, let's publish this!" or "let's copy this text over to a markdown file that can function as a draft of a blog post" etc etc etc. 

This is where we need to perform some additional moves before we log the reaction and send a message back. The sky is really the limit here, but, for right now, let's keep it relatively simple and try to
* get the contents of the original item so that we can save that too
* get the user name associated with the user_id
* if the original item is an image, let's save it to an Airtable that logs `RocketedImages`
* if the original item is text, let's save it to an Airtable that logs `RocketedTexts` 
* and then send the markdown to the original author with a note saying: this is amazing, would you like to create a hackmd file with these contents as a draft for a blog post?
    * or maybe send to their personal-log channel?

So first we need to get that original item, and to do this we'll need to find 



### MESSAGE BLOCKS

Structure messages with more interesting content. 

OK. Let's return to some of the messages we sent back in earlier responses and format them a bit, beginning with the `/howto` slash command. As a reminder, we have
* a **Name** for the record
* markdown **Text** with the instructions
* an **ImageLink**

Let's use Slack's Block Kit to send back a nicely formatted message. There's a nice visual tool called [Block Kit Builder](https://app.slack.com/block-kit-builder/) that can help us. Hop over there and 
1. hit the "Clear Blocks" button so you can start from scratch
2. the left sidebar is filled with everything you can add. Scroll to the near the bottom and click the "Image" option that has "no title"
3. now click "Header" to add one--if you want, you can change the text by editing the code in the right-hand panel
4. now click the "mrkdwn" option for a text field (note, not all the usual markdown elements will work here, sadly)

You should end up with code in the right-hand panel that looks like this:

```
{
	"blocks": [
		{
			"type": "image",
			"image_url": "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
			"alt_text": "inspiration"
		},
        {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "This is a header block",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
			}
		}
	]
}
```
Let's use that as a template to construct our own response.

First, just after we get back the `airtableResult`, we'll use that data to define the blocks:

```
const blocks = [
    {
        "type": "image",
        "image_url": airtableResult[0].fields.ImageLink,
        "alt_text": airtableResult[0].fields.Name
    },
    {
        "type": "header",
        "text": {
            "type": "plain_text",
            "text": `how to ${airtableResult[0].fields.Name}`,
            "emoji": true
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": airtableResult[0].fields.Notes
        }
    }
]
```

now we'll change our response so that we use the `client.chat.postMessage()` method instead of just `respond()`. Let's make sure we're grabbing it at the beginning as we destructure (add client to the array of destructured parameters in the first line of the method)

```
exports.howto = async ({ command, ack, respond, client }) => {
    // etc.
}
```

NOTE: MAYBE SWITCH THESE TWO STEPS?

Then we'll send back the blocks to the channel where the slash command occured:

```
const result = await client.chat.postMessage({
    channel: command.channel_id,
    blocks: blocks
})
```

So right now the full code for the method looks like this:

```
exports.howto = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    const airtableResult = await airtableUtilities.findByValue({
        baseId: process.env.AIRTABLE_BOT_BASE_ID,
        table: "HowTos",
        maxRecords: 1,
        view: "MAIN",
        field: "Name",
        value: command.text
    })
    const blocks = [
        {
            "type": "image",
            "image_url": airtableResult[0].fields.ImageLink,
            "alt_text": airtableResult[0].fields.Name
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `how to ${airtableResult[0].fields.Name}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": airtableResult[0].fields.Notes
            }
        }
    ]
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        blocks: blocks
    })
}
```

### INTERACTIVE MESSAGES

There's more we can do with blocks, including adding interactivity to our messages. 

In this section, let's create a logging tool that will allow us to click an array of buttons to log events to Airtable.

So we'll create a new `/log` slash command, starting in the Slack API dashboard and then adding to `app.js`

```
app.command('/log', slashHandler.log);
```

and then adding a new exported function to our `slash-handler.js` file, keeping it simple at first to test if it's working:

```
exports.log = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    console.log(`heard log slash:\n${JSON.stringify(command, null, 4)}`)
    const blocks = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `here's your logger`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `we'll be setting up buttons for these words:\n\t${command.text}`
            }
        }
    ]
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        blocks: blocks
    })
}
```
Now let's add a random photo of a logger to make this all a little more playful and entertaining. First let's write a random-logger generator:

```
function randomElement(array){
    let randomInt = Math.floor(Math.random() * array.length);
    return array[randomInt]
}

module.exports = ()=>{
    const loggerImages = [
        "https://www.evergreenmagazine.com/static/e51ccc52144bb51f88aa89adfbefb827/logger-750x330.jpg",
        "https://previews.123rf.com/images/tverdohlib/tverdohlib1806/tverdohlib180600063/102278619-elegant-man-in-suit-logger-with-beard.jpg",
        "https://thumbs.dreamstime.com/b/one-handsome-strong-stylish-male-logger-young-man-long-lush-black-beard-moustache-shirt-holding-wooden-axe-standing-130226105.jpg",
        "https://i.pinimg.com/564x/88/a4/31/88a431b8b6d2c443b4ceeaabcd55fe71.jpg",
        "https://i.pinimg.com/564x/a0/2b/b6/a02bb6679813ca595d1bd28a7b507963.jpg",
        "https://i.pinimg.com/750x/f0/35/e8/f035e8327abb9020c3d135303e83c834.jpg",
        "https://i.pinimg.com/564x/bb/6b/49/bb6b49dacd7b715e965196ba7bc784ec.jpg",
        "https://i.pinimg.com/564x/88/a4/31/88a431b8b6d2c443b4ceeaabcd55fe71.jpg",
        "https://www.evergreenmagazine.com/static/e51ccc52144bb51f88aa89adfbefb827/logger-750x330.jpg",
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/logger-cutting-tree-trunk-cameroon-cyril-ruoso.jpg",
        "https://media.istockphoto.com/photos/lumberjack-picture-id617762388?k=20&m=617762388&s=612x612&w=0&h=aZ5yY0tIJrj5HAqbQa-GI7WmMnEl34x0OPsLQzhQ4zw=",
        "https://i.pinimg.com/564x/67/75/e5/6775e5641264c98a114d6852a162b7c5.jpg",
        "https://i.pinimg.com/564x/ce/86/60/ce8660e8b0bdc95ae40f14145307986c.jpg",
        "https://i.pinimg.com/564x/db/d2/34/dbd2340c09f89237881e73ea6ae87b2e.jpg"
    ];
    return randomElement(loggerImages);
}
```

This function will return a random logger:

![logger](https://i.pinimg.com/564x/a0/2b/b6/a02bb6679813ca595d1bd28a7b507963.jpg)

All we have to do is add it to our blocks array:

```
{
    "type": "image",
    "image_url": randomLogger(),
    "alt_text": "random logger"
},
```

See if you can figure out where this goes first. But if you're having trouble, this is the completed method as it stands right now.
```

exports.log = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    console.log(`heard log slash:\n${JSON.stringify(command, null, 4)}`)
    const blocks = [
        {
            "type": "image",
            "image_url": randomLogger(),
            "alt_text": "logger"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `here's your logger`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `we'll be setting up buttons for these words:\n\t${command.text}`
            }
        }
    ]
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        blocks: blocks
    })
}
```

Next up, we want to split the `command.text` into an array of words separated by spaces and then create an array of buttons for each of the terms the user has typed.

```

```



### MODALS

*is this actually where we'd do a more form like thing?*

### THE HOME VIEW

*how much of a dashboard or even control-center can this become?*


## NOTES


### TO DO

* sort out the [home tab](https://api.slack.com/surfaces/tabs/using)
* try current practices for deploying to [aws lambda](https://slack.dev/bolt-js/deployments/aws-lambda)
* try current practices for deploying to [heroku](https://slack.dev/bolt-js/deployments/heroku)
* try [deep linking](https://api.slack.com/reference/deep-linking#open_app_home) to take people directly to a specific page in slack 


### PAST IDEAS

what all did we do or plan to do in the past?

* show me gifs
* emoji photos (and add emojis to airtable)
* slack random stills on ingest
* post m2s
* post gifs
* save student work
* make a timeline
* make a task
* tell me my tasks
* live log
* sentiment analysis of channels and posts
* emoji to perform arbitrary operation
* how to
* macsetup
* 

### THIS YEAR

what do we want to do this year? and in what order?

* change lighting setup?
* perform operations on local machine?
* tie in to XR dev


### ELEMENTS

* slash commands
* webhooks
* interactive messages
    * input fields
    * selects
    * buttons
* event listeners
* message listeners
* views
* home
* view submissions
* blocks

## REFERENCE
* [ngrok](https://dashboard.ngrok.com/get-started/setup)
* [bolt](https://slack.dev/bolt-js/concepts)
* [bolt docs on github](https://github.com/slackapi/bolt-js)
* [regular bolt docs](https://slack.dev/bolt-js/concepts#event-listening)
* [public slack figma files](https://www.figma.com/@slack)
* [slack guide to the home tab](https://api.slack.com/surfaces/tabs/using)
* [interactivity with block kit](https://api.slack.com/block-kit/interactivity)
* [date-fns](https://date-fns.org/docs/Getting-Started) docs as we replace momentjs with it