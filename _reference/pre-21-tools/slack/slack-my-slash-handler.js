// var airtableTools = require('./tools/airtable-tools');
var Airtable = require('airtable');
var airtableTools = require('../airtable/airtable-tools');
var moment = require('moment');
var s19 = require('../indexes/summer2019-tools');
var yargs = require('yargs');
var fs = require('fs');
var path = require('path');


module.exports = async function(req, res, next) {
  console.log('got /my slash request');
  var theBase = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_WORK_BASE);
  var atResult = await airtableTools.findMany({
    base: theBase,
    table: 'work: needs more work',
    view: 'MakeItAResource'
  });
  console.log("got at result that's " + atResult.length + " records long");
  console.log(JSON.stringify(atResult, null, 4));
  var message = {
    blocks: [
      {
  			"type": "header",
  			"text": {
  				"type": "plain_text",
  				"text": "here's your menu for the day!"
  			}
  		},
  		{
  			"type": "divider"
  		},
  		{
  			"type": "image",
  			"title": {
  				"type": "plain_text",
  				"text": "I Need a Marg",
  				"emoji": true
  			},
  			"image_url": "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy-downsized.gif",
  			"alt_text": "marg"
  		},
  		{
  			"type": "header",
  			"text": {
  				"type": "plain_text",
  				"text": "Keep Cookin' Up...",
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
  for (var i = 0; i < atResult.length; i++) {
    console.log("trying to add block for record");
    console.log(JSON.stringify(atResult[i], null, 4));
    console.log("name =");
    console.log(atResult[i].fields.name);
    message.blocks.push({
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `<${atResult[i].fields.linkUrl}|*${atResult[i].fields.name}*>\n${atResult[i].fields.description}`
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "I'll work on this Now!",
					"emoji": true
				},
				"value": "click_me_123"
			}
		})

  }
    message.blocks.push({
      "type": "divider"
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Got An Appetite For... ",
        "emoji": true
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
      }
    })
    for (var i = 0; i < atResult.length; i++) {
      console.log("trying to add block for record");
      console.log(JSON.stringify(atResult[i], null, 4));
      console.log("name =");
      console.log(atResult[i].fields.name);
      message.blocks.push({
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `<${atResult[i].fields.linkUrl}|*${atResult[i].fields.name}*>\n${atResult[i].fields.description}`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "I'll do it!!",
            "emoji": true
          },
          "value": "click_me_123"
        }
      })

    }


  res.json(message);
  // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
  //   res.send("sent something to Airtable:" + JSON.stringify(data));
  // })
}

var referenceMessage = {
	"blocks": [



		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "<https://www.google.com|*Title*>\nThis is a description of the resource. "
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "I'll do it!",
					"emoji": true
				},
				"value": "click_me_123"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
					"alt_text": "cute cat"
				},
				{
					"type": "mrkdwn",
					"text": "*Cat* has approved this message."
				}
			]
		}
	]
}
