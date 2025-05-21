var yargs = require('yargs');
var s19 = require('../indexes/summer2019-tools');

module.exports = async function(req, res, next) {
  console.log('got slack-slash-code post request:');
  var theYargs = yargs.parse(req.body.text);
  if (theYargs._.length < 1) {
    res.send("you need to enter a couple of tags. Just type some words separated by spaces.")
  } else {
    var tagArray = theYargs._.map(el => {
      return {
        text: el,
        value: `${el}`
      }
    })
    var slackMessage = {
      blocks: [
        s19.blx.section(`\nOK! Time to start entering data!\n\nGo ahead and press the buttons below to log what you see. If logging people talking, go ahead and press continually as a person keeps talking, as this will give us more accurate data overall. When you're done logging, go to the following URL to see a timeline of your entries: https://summer2019.learninglab.xyz/logs/timeline/${req.body.user_id}/a/b`, 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif'),
        s19.blx.divider(),
        s19.blx.choicesWithValues(tagArray)
      ]
    }
    console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\nslackMessage = ${JSON.stringify(req.body, null, 4)}`);
    res.json(slackMessage)

    // airtableTools.sendToAirtable(theRecord, {table: "Updates"}, (data)=>{
    //   res.send("sent something to Airtable:" + JSON.stringify(data));
    // })
  }
}
