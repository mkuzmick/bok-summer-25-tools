// takes a shoot object (in theWorkflow form)
// and converts it to Airtable form

module.exports = function(card) {
  this.ShootId = card.shootId;
  this.FolderId = card.FolderId;
  this.Date = card.Date;
  this.Notes = "just a test for now";
  this.ShootRecord = [card.airtableShootRecordId];
  this.Stills = []
  for (var i = 0; i < card.stills.length; i++) {
    this.Stills.push(card.stills[i].airtableId);
    console.log(`set the airtableId for ${card.stills[i].name} to ${card.stills[i].airtableId}`);
  }
  var clipNames = "";
  for (var i = 0; i < card.clips.length; i++) {
    clipNames+= (card.clips[i].newName + ",")
  }
  this.FileList = clipNames;
  // this.clips = shoot.airtableRecords.map(record => (record.id));
}
