const s19 = require('../indexes/summer2019-tools');
var testTimelineJson = require('../../data/timeline-json-example.json');
var Airtable = require('airtable');
var fs = require('fs');

module.exports = async function (req, res, next){
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  var draftEvents = await s19.airtableTools.findManyByValue({
    base: base,
    table: "TimelineJs",
    maxRecords: 50,
    field: "Type",
    value: req.params.id,
  });
  console.log(
    JSON.stringify(draftEvents, null, 4)
  );
  var events = draftEvents.map(event => {
    return s19.timelineEvent(event)
  })
  var timelineJson = {
    "title": {
        "media": {
          "url": "https://farm8.staticflickr.com/7872/46386430495_644c8ebe2e_h.jpg",
          "caption": "LLUFs at work.",
        },
        "text": {
          "headline": `Summer2019 Timeline of type "${req.params.id}"`,
          "text": "<p>Just the stuff that has been submitted.</p>"
        }
    },
    events: events
  }
  fs.writeFileSync('/Users/mk/Development/summer2019/data/timeline.json', JSON.stringify(timelineJson, null, 4))
  res.render('timeline', {
    title: "timeline test",
    message: "will replace this with dynamic data soon",
    timeline_json: timelineJson
  })
}
