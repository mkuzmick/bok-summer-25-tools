const s19 = require('../indexes/summer2019-tools');
var testTimelineJson = require('../../data/timeline-json-example.json');
var Airtable = require('airtable');

module.exports = async function (req, res, next){
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  var draftEvents = await s19.airtableTools.findManyByValue({
    base: base,
    table: "InteractionLog",
    maxRecords: 100,
    field: "UserSlackId",
    view: "byCreatedTime",
    value: req.params.userid,
  });
  console.log(
    JSON.stringify(draftEvents, null, 4)
  );
  var events = draftEvents.map(event => {
    return s19.interactionToEvent(event)
  })
  var timelineJson = {
    // "title": {
    //     "media": {
    //       "url": 'https://slackhq.com/admin-slacktips/wp-content/uploads/sites/2/2019/01/0_Custom-Slack-Emojis.png',
    //       "caption": "slack log interactions.",
    //     },
    //     "text": {
    //       "headline": `Summer2019 :${req.params.userid}: Timeline`,
    //       "text": `<p>Timeline of all ${req.params.userid}'s logs between ${req.params.start} and ${req.params.stop}</p>`
    //     }
    // },
    events: events
  }
  s19.objToFile(timelineJson);
  res.render('timeline', {
    title: `${draftEvents[0].fields.UserName}'s logs`,
    message: "",
    timeline_json: timelineJson
  })
}
