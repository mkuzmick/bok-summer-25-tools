var moment = require('moment');
var path = require('path');

module.exports = function(cardPath){
  this.FolderId = path.basename(cardPath);
  this.initialFolderPath = cardPath;
  var nameElements = path.basename(cardPath).split("_");
  nameElements.pop();
  this.shootId = nameElements.join("_");
  this.clips = [];
  this.stills = [];
  this.notes = "";
}
