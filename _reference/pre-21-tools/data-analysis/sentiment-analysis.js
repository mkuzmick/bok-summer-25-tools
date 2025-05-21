var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var fs = require('fs');
var path = require('path');

var analyzeText = async function (text){
  var result = sentiment.analyze(text);
}

var analyzeSlackDataFolder = async function (slackDataFolder){
  var files = fs.readdirSync(slackDataFolder);
  var allText = ""
  for (var i = 0; i < files.length; i++) {
    var dayData = require(path.join(slackDataFolder, files[i]));
    for (var j = 0; j < dayData.length; j++) {
      // console.log((dayData[j].text ? dayData[j].text : "no text"));
      allText+=(dayData[j].text ? dayData[j].text : "")
    }
  }
  // console.log(allText);
  var allTextResult = sentiment.analyze(allText);
  console.log("score: " + allTextResult.score);
  console.log("comparative: " + allTextResult.comparative);
  return allTextResult;
}

module.exports.analyzeText = analyzeText;
module.exports.analyzeSlackDataFolder = analyzeSlackDataFolder;
