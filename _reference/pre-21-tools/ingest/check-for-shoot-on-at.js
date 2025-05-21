var airtableTools = require("../airtable/airtable-tools");
var AirtableShoot = require('../constructors/airtable-shoot');
var Airtable = require('airtable');
var moment = require('moment');

module.exports = async function(card){
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_INGEST_BASE);
  var result = await airtableTools.findOneByValue({
    view: "Grid view",
    field: "ShootID",
    value: card.shootId,
    base: base,
    table: "Shoots"
  });
  if (result) {
    console.log("there is already a shoot in there--we'll just add this card and its files to it");
    console.log(JSON.stringify(result));
    return result;
  } else {
    console.log("this shoot doesn't exist yet.  We'll create it now and add this card and its files.");
    var thisShoot = new AirtableShoot({
      shootId: card.shootId
        })
    var newShootAirtableData = await airtableTools.sendToAirtable(thisShoot, base, "Shoots");
    return newShootAirtableData;
  }
}
