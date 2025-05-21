const s19 = require('../indexes/summer2019-tools');
var testTimelineJson = require('../../data/timeline-json-example.json');
var Airtable = require('airtable');

module.exports = async function (req, res, next){
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  var draftEvents = await s19.airtableTools.findMany({
    base: base,
    table: "ReactionLog",
    maxRecords: 100,
    view: "byCreatedTime"
  });
  console.log(
    JSON.stringify(draftEvents, null, 4)
  );
  var theCounts = getCounts(draftEvents);
  var events = draftEvents.map(event => {
    return s19.emojiToEvent(event);
  })
  var timelineJson = {
    "title": {
        "media": {
          "url": 'https://slackhq.com/admin-slacktips/wp-content/uploads/sites/2/2019/01/0_Custom-Slack-Emojis.png',
          "caption": "slack reactions.",
        },
        "text": {
          "headline": `Summer2019 Timeline of Emojis`,
          "text": `<p>Timeline of last 100 emojis in slack</p><pre>${JSON.stringify(theCounts, null, 4)}</pre>`
        }
    },
    scale_factor: 1,
    events: events
  }
  s19.objToFile(timelineJson);
  res.render('timeline', {
    title: "emoji",
    message: "timeline of the last 100 emojis",
    timeline_json: timelineJson
  })
}

function getCounts(events){
  var counts = {};
  for (var i = 0; i < events.length; i++) {
    var emoji = events[i].fields.ReactionType;
    counts[emoji] = counts[emoji] ? counts[emoji] + 1 : 1;
  }
  var countsArray = []
  Object.keys(counts).forEach(key => {
    let value = counts[key];
    countsArray.push({
      emoji: key,
      count: value
    })
    //use key and value here
  });
  countsArray.sort((a, b) => (a.count < b.count) ? 1 : -1)
  return countsArray;
}

// function getCountsSummary ()
