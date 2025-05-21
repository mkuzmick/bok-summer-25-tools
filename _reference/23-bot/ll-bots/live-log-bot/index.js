const airtableTools = require(`../../ll-modules/ll-airtable-tools`)
const { llog } = require('../../ll-modules/ll-utilities')
const randomLogger = require('./random-logger.js')
  
const liveLogBot = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    console.log(`heard log slash:\n${JSON.stringify(command, null, 4)}`)
    let terms = command.text.split(" ");

    // let uniqueChars = chars.filter((c, index) => {
    //     return chars.indexOf(c) === index;
    // });

    let uniqueTerms = [...new Set(terms)];
    var elements = []
    for (let index = 0; index < uniqueTerms.length; index++) {
        elements.push({
            "type": "button",
					"text": {
						"type": "plain_text",
						"text": uniqueTerms[index],
						"emoji": true
					},
					"value": `log_${uniqueTerms[index]}`,
					"action_id": `log_action_${uniqueTerms[index]}`
        })   
    }
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
        },
        {
			"type": "actions",
			"elements": elements
		}
    ]
    
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        text: "if you see this, the logging machine can't work in this context",
        blocks: blocks
    })
}

module.exports = liveLogBot