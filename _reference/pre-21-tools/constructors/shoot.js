var moment = require('moment');
var path = require('path');

module.exports = function(shootPath){
  this.initialFolderPath = shootPath;
  this.shootId = path.basename(shootPath);
  this.dateString = this.shootId.substr(0,8);
  this.date = moment(this.dateString);
  this.cameras = [];
  this.subfolders = [];
  this.clips = [];
  this.stills = [];
  this.notes = "";
}
