// ready to receive draft events from summer2019 airtable
var moment = require('moment-timezone');

module.exports = function(draftEvent) {
  console.log("!!!!!!!!!!!!!!!!!!!!!\ncreating revised event");
  var revisedEvent = {
      "media": {
        "url": 'https://media.giphy.com/media/1iu8uG2cjYFZS6wTxv/giphy.gif',
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
        "headline": draftEvent.fields.Text.split(' ')[0],
        "text": `${draftEvent.fields.Text}\nposted at ${draftEvent.fields.AirtableCreatedTime}`
      }
  }
  console.log(JSON.stringify(revisedEvent));
  return revisedEvent
}
