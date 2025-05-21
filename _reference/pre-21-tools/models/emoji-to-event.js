// ready to receive draft events from summer2019 airtable
var moment = require('moment-timezone');

module.exports = function(draftEvent) {
  console.log("!!!!!!!!!!!!!!!!!!!!!\ncreating revised event");
  var revisedEvent = {
      "media": {
        "url": 'https://slackhq.com/admin-slacktips/wp-content/uploads/sites/2/2019/01/0_Custom-Slack-Emojis.png',
        "caption": "emojis (better images soon)",
        "credit": "slack"
      },
      "start_date": {
        "second": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('s'),
        "minute": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('m'),
        "hour": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('H'),
        "month": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('M'),
        "day": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('D'),
        "year": moment(draftEvent.fields.AirtableCreatedTime).tz('America/New_York').format('YYYY'),
      },
      "text": {
        "headline": draftEvent.fields.ReactionType,
        "text": `reference to a ${draftEvent.fields.ReactionType} at ${draftEvent.fields.AirtableCreatedTime} in channel ${draftEvent.fields.Channel}.  If it was made by a user, that user's name is ${draftEvent.fields.UserName}`
      }
  }
  console.log(JSON.stringify(revisedEvent));
  return revisedEvent
}
