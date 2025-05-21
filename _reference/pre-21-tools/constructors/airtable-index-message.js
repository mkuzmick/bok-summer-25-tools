module.exports = function(cardId, slackTs, stills){
  console.log("creating a new AirtableIndexMessage");
  this.CardId = cardId;
  this.SlackTs = slackTs;
  this.Stills = stills;
}
