const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../utilities/ll-logs')

const macros = [
    {
        index: 20,
        name: "key-2-top-left-50",
        // text: ""
    },
    {
        index: 21,
        name: "key-2-top-right-50"
    },
    {
        index: 22,
        name: "key-2-bottom-left-50"
    },
    {
        index: 23,
        name: "key-2-bottom-right-50",
    },
    {
        index: 24,
        name: "key-2-center",
    },
]

const atemButtonBlocks = async () => {
	magenta()
    const blocks = [
        {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Hub buttons",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "hit buttons to run macros"
			}
		},
        {
            "type": "divider"
        },
        
	]
    const actions = {
        "type": "actions",
        "elements": [
        ]
    }


    for (let index = 0; index < macros.length; index++) {
        actions.elements.push(
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": `${macros[index].index}: ${macros[index].name}`,
                    "emoji": true
                },
                "value": `${macros[index].index}`,
                action_id: `atembutton_${macros[index].index}`
            }
        )
        
    }
    blocks.push(actions)
    return blocks
}

module.exports = atemButtonBlocks
