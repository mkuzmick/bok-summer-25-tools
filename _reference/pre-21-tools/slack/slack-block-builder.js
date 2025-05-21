module.exports.section = function(text, image){
  var block = {
    "type": "section",
		"text": {
			"type": "mrkdwn",
			"text": text
		}
  }
  if (image) {
    block.accessory = {
			"type": "image",
			"image_url": image,
			"alt_text": "alt text for image"
	   }
  }
  return block;
}

module.exports.jsonString = function(title, obj){
  var block = {
    "type": "section",
		"text": {
			"type": "plain_text",
			"text": `**1000 characters of ${title}**\n${JSON.stringify(obj, null, 4).substring(0,1000)}`
		}
  }
  return block;
}

module.exports.divider = function(){
  return {
    "type": "divider"
  }
}

module.exports.image = function(imageUrl, text){
  return {
    "type": "image",
		"title": {
			"type": "plain_text",
			"text": text ? text : "image",
			"emoji": true
		},
		"image_url": imageUrl,
		"alt_text": text ? text : "image"
  }
}

module.exports.simpleChoices = function(array){
  var block = {
		"type": "actions",
		"elements": []
	};
  for (var i = 0; i < array.length; i++) {
    var button = {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": array[i],
        "emoji": true
      },
      "value": "choiceMade"
    }
    block.elements.push(button)
  }
  return block;
}

module.exports.choicesWithValues = function(array){
  var block = {
		"type": "actions",
		"elements": []
	};
  for (var i = 0; i < array.length; i++) {
    var button = {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": array[i].text,
        "emoji": true
      },
      "value": array[i].value
    }
    block.elements.push(button)
  }
  return block;
}
