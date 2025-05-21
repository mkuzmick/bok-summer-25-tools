const atemTools = require(`../../ll-modules/ll-blackmagic-tools`);
const { blue, yellow, cyan, magenta, gray } = require('../../ll-modules/ll-utilities/mk-utilities')
const { resourceFromMessageLink } = require(`../resource-bot`);
const makeGif = require(`../gif-bot/make-gif`)

exports.hello = async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Studiobot is running, <@${message.user}>!`);
}

exports.rocket = async ({ message, say }) => {
    await say(`thanks for the :rocket:, <@${message.user}>`);
}

exports.parseAll = async ({ message, say }) => {
    magenta(`parsing all messages`)
    yellow(message.channel)
    blue(process.env.SLACK_CREATE_RESOURCE_CHANNEL)
    if (message.channel == process.env.SLACK_CREATE_RESOURCE_CHANNEL) {
        magenta(`handling message`)
        yellow(message)
        let theResource = await resourceFromMessageLink(message);
        magenta(theResource)
        await say(`got a message in the resource channel`) 
    } else {
        magenta(`some other message we aren't handling now--uncomment message-handler line 27 to get the json`)
        yellow(message)
    }
}

