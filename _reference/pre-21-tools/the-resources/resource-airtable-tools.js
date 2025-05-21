var Airtable = require('airtable');
var moment = require('moment');

// send in options object with record, table, and base
module.exports.addRecord = async function(options){
  var base = new Airtable({apiKey: process.env.AIRTABLE_CODE_API_KEY}).base(options.base);
  var airtableResult = await base(options.table).create(options.record).then(result => {
    console.log("saved to airtable");
    return result;
  })
    .catch(err => {
      console.log("\nthere was an error with the AT push\n");
      console.error(err);
      return;
    });
  return airtableResult;
}
