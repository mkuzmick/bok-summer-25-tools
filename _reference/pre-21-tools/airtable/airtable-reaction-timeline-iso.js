const s19 = require('../indexes/summer2019-tools');
var testTimelineJson = require('../../data/timeline-json-example.json');
var Airtable = require('airtable');

module.exports = async function (req, res, next){
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  var draftEvents = await s19.airtableTools.findManyByValue({
    base: base,
    table: "ReactionLog",
    maxRecords: 50,
    field: "ReactionType",
    view: "byCreatedTime",
    value: req.params.id,
  });
  console.log(
    JSON.stringify(draftEvents, null, 4)
  );
  var events = draftEvents.map(event => {
    return s19.emojiToEvent(event)
  })
  var timelineJson = {
    "title": {
        "media": {
          "url": 'https://slackhq.com/admin-slacktips/wp-content/uploads/sites/2/2019/01/0_Custom-Slack-Emojis.png',
          "caption": "slack reactions.",
        },
        "text": {
          "headline": `Summer2019 :${req.params.id}: Timeline`,
          "text": `<p>Timeline of all instances of the :${req.params.id}: emoji</p>`
        }
    },
    events: events
  }
  s19.objToFile(timelineJson);
  res.render('timeline', {
    title: "timeline test",
    message: "",
    timeline_json: timelineJson
  })
}
