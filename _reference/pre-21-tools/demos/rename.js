var path = require('path');
var fs = require('fs');
var myInput = process.argv[2];

var allMyFiles = fs.readdirSync(myInput);
var allMyActualFiles = allMyFiles.filter(element => {
  return !/^\./.test(element);
});

var videoFiles = [];

for (var i = 0; i < allMyActualFiles.length; i++) {
  var newFile = new VideoFile(myInput, allMyActualFiles[i], i);
  videoFiles.push(newFile);
}

function VideoFile(folderPath, filename, i) {
  this.initialFolderPath = folderPath;
  this.folderName = path.basename(folderPath);
  this.oldName = filename;
  this.oldPath = path.join(folderPath, filename);
  this.newName = this.folderName + "_" + (i + 1).toString().padStart(3, '0');
  this.newPath = path.join(folderPath, this.newName);
  this.stats = fs.statSync(this.oldPath);
  fs.renameSync(this.oldPath, this.newPath);
}

console.log(JSON.stringify(videoFiles, null, 4));
