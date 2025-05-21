
const createSlateView = ({ user, trigger_id, commandText, uniqueTerms }) => {    
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
					"action_id": `slate_action_${uniqueTerms[index]}`
        })   
    }
    const theView = {
        trigger_id: trigger_id,
        view: {
          type: 'modal',
          callback_id: 'slate_submission',
          title: {
            type: 'plain_text',
            text: 'Slate'
          },
          "blocks": [
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "project_title_input",
                    "initial_value": commandText.substring(0, 53)               
                },
                "label": {
                    "type": "plain_text",
                    "text": "Title",
                    "emoji": true
                },
                "block_id": "project_title"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "project_description_input",
                    "initial_value": commandText
                },
                "label": {
                    "type": "plain_text",
                    "text": "Description",
                    "emoji": true
                },
                "block_id": "project_description"
            },
            {
                "type": "actions",
                "elements": elements
            },
            {
                "type": "input",
                "element": {
                    "type": "radio_buttons",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "project launch",
                                "emoji": true
                            },
                            "value": "Project Launch"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "lookbook",
                                "emoji": true
                            },
                            "value": "Lookbook"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "feature request",
                                "emoji": true
                            },
                            "value": "Feature Request"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "workshop",
                                "emoji": true
                            },
                            "value": "Workshop plan"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "resource",
                                "emoji": true
                            },
                            "value": "Resource"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "single-action",
                                "emoji": true
                            },
                            "value": "Single Action Item"
                        }
                    ],
                    "action_id": "project_type_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "When?",
                    "emoji": true
                },
                "block_id": "project_type"
            },
            {
                "type": "input",
                "element": {
                    "type": "multi_users_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select collaborators",
                        "emoji": true
                    },
                    "action_id": "collaborators_input",
                    "initial_users": user ? [user] : []
                },
                "label": {
                    "type": "plain_text",
                    "text": "Collaborators",
                    "emoji": true
                },
                "block_id": "collaborators"
            }
        ],
        submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      }
      return theView
}

module.exports = createSlateView


// var elements = [];
// for (let index = 0; index < uniqueTerms.length; index++) {
//     elements.push({
//         "type": "button",
//                 "text": {
//                     "type": "plain_text",
//                     "text": uniqueTerms[index],
//                     "emoji": true
//                 },
//                 "value": `log_${uniqueTerms[index]}`,
//                 "action_id": `log_action_${uniqueTerms[index]}`
//     })   
// }


// const blocks = [
//     {
//         "type": "image",
//         "image_url": "https://i.giphy.com/media/VFrFvfv0DY553pRSKV/giphy.webp",
//         "alt_text": "logger"
//     },
//     {
//         "type": "header",
//         "text": {
//             "type": "plain_text",
//             "text": `here's your logger`,
//             "emoji": true
//         }
//     },
//     {
//         "type": "section",
//         "text": {
//             "type": "mrkdwn",
//             "text": `we'll be setting up buttons for these words:\n\t${command.text}`
//         }
//     },
//     {
//         "type": "actions",
//         "elements": elements
//     }
// ]

// const result = await client.chat.postMessage({
//     channel: command.channel_id,
//     text: "if you see this, the logging machine can't work in this context",
//     blocks: blocks
// })