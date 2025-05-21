var moment = require('moment');
var path = require('path');
var fs = require('fs');


module.exports = function(clipPath, cardId, clipNumber){
  this.cardId = cardId;
  this.initialPath = clipPath;
  this.initialFolderPath = path.dirname(clipPath);
  var pathElements = path.basename(this.initialFolderPath).split("_");
  this.camera = pathElements[(pathElements.length - 1)];
  this.ext = path.extname(clipPath);
  this.initialName = path.basename(clipPath);
  this.stats = fs.statSync(clipPath)
  this.newName = cardId
    + "_" + (clipNumber + 1).toString().padStart(3, "0")
    + this.ext;
  this.newPath = path.join(this.initialFolderPath, this.newName);
}
