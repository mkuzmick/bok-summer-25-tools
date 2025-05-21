var moment = require('moment');

module.exports = function(clip) {
  // console.log("-----------CLIP--------------");
  // console.log(JSON.stringify(clip, null, 4));
  this.Name = clip.newName;
  this.Type = clip.ffprobeData.streams[0].codec_long_name ?  clip.ffprobeData.streams[0].codec_long_name : "NA";
  this.OriginalName = clip.initialName;
  // this.initialFolderPath = clip.initialFolderPath;
  this.Width = clip.ffprobeData.streams[0].width ? clip.ffprobeData.streams[0].width.toString() : "NA";
  this.Height = clip.ffprobeData.streams[0].height ? clip.ffprobeData.streams[0].height.toString() : "NA";
  this.Duration = clip.ffprobeData.streams[0].duration ? clip.ffprobeData.streams[0].duration.toString() : "NA";
  this.FileSize = clip.ffprobeData.format.size ? clip.ffprobeData.format.size.toString() : "NA";
  this.InTimecode = clip.ffprobeData.streams[0].duration ? clip.ffprobeData.streams[0].tags.timecode : "NA";
  if (clip.ffprobeData.format.tags["com.apple.proapps.manufacturer"]) {
    this.Camera = (clip.ffprobeData.format.tags["com.apple.proapps.manufacturer"]
      + " " + clip.ffprobeData.format.tags["com.apple.proapps.modelname"])
  } else if (clip.ffprobeData.format.tags["com.apple.quicktime.make"]) {
    this.Camera = (clip.ffprobeData.format.tags["com.apple.quicktime.make"]
      + " " + clip.ffprobeData.format.tags["com.apple.quicktime.model"]
    )
  } else {
    this.Camera = clip.camera
  }
  var nameElements = this.Name.split("_");
  nameElements.pop();
  nameElements.pop();
  this.ShootId = nameElements.join("_");
  this.OutTimecode = "coming soon";
  this.CardId = clip.cardId;
}

function findTcOut(tcIn, duration){
  secsToTimecode(timecodeToSeconds(tcIn) + duration)
}

function secondsToTimecode(seconds){
  var timecode
  return timecode
}

function timecodeToSeconds(timecode){
  var seconds
  return seconds
}
