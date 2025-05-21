
module.exports = function(data) {
  // console.log("-----------CLIP--------------");
  // console.log(JSON.stringify(clip, null, 4));
  this.Name = data.name;
  this.Cards = data.card;
  this.SlackTs = data.slackTs;
}
