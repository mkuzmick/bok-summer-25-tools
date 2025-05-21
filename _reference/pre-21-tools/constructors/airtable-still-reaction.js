// constructs a record for a stillreaction
// from the slackData for the reaction event
module.exports = function(slackData, airtableData){
  console.log("creating new airtable StillReaction");
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  console.log(JSON.stringify(slackData, null, 4));
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  console.log(JSON.stringify(airtableData, null, 4));
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  console.log("++++++++++++++++++++");
  this.Name = slackData.event.reaction;
  this.Stills = [airtableData.id];
}
