// ready to receive draft events from summer2019 airtable
var moment = require('moment');

module.exports = function(draftEvent) {
  var theText = draftEvent.fields.Text ? draftEvent.fields.Text
    : "No text provided"
  var revisedEvent = {
      "media": {
        "url": draftEvent.fields.MediaLink,
        "caption": draftEvent.fields.MediaCaption,
        "credit": draftEvent.fields.MediaCredit
      },
      "start_date": {
        "second": moment(draftEvent.fields.Start).format('s'),
        "minute": moment(draftEvent.fields.Start).format('m'),
        "hour": moment(draftEvent.fields.Start).format('H'),
        "month": moment(draftEvent.fields.Start).format('M'),
        "day": moment(draftEvent.fields.Start).format('D'),
        "year": moment(draftEvent.fields.Start).format('YYYY'),
      },
      "text": {
        "headline": draftEvent.fields["Headline"],
        "text": theText
      }
  }
  console.log("***********************");
  console.log(JSON.stringify(revisedEvent, null, 4));
  return revisedEvent
}
