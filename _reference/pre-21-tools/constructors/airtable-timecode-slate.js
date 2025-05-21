var moment = require('moment');
var timecodeTools = require('../timecode/timecode-tools');

module.exports = function(data) {
  try {
    this.SlateStartInt = data.clips[0].ffprobeData.format.tags.creation_time ? moment(data.clips[0].ffprobeData.format.tags.creation_time).valueOf() : moment(data.clips[0].stats.birthtime).valueOf()
    var slateStopUnix = this.SlateStartInt
      + parseFloat(data.clips[0].ffprobeData.format.duration)
    this.SlateStartUnix = this.SlateStartInt.toString();
    this.SlateStopUnix = slateStopUnix.toString();
    this.SlateStartDate = moment(this.SlateStartInt).toISOString();
    this.SlateStartDateGMT = moment(this.SlateStartInt).toISOString();
    this.SlateStopDate = moment(slateStopUnix).toISOString();
    this.SlateStopDateGMT = moment(slateStopUnix).toISOString();
  } catch (e) {
    console.log(e);
    console.log("problem assigning start data in airtable-timecode-slate constructor");
  }
  this.CardId = data.FolderId;
  this.Filename = data.clips[0].newName;
  this.SlateStartTimecode = data.clips[0].ffprobeData.streams[0].tags.timecode;
  this.SlateStopTimecode = timecodeTools.inTcAndFramesToOutTc(this.SlateStartTimecode, data.clips[0].ffprobeData.streams[0].nb_frames);
  this.CameraId = data.clips[0].camera;
  this.ZeroUnix = timecodeTools.getZeroUnix(this.SlateStartUnix, this.SlateStartTimecode).toString();
  this.ZeroUnixFloat = timecodeTools.getZeroUnix(this.SlateStartUnix, this.SlateStartTimecode);
  this.ZeroDate = moment(this.ZeroUnixFloat).toISOString();
  this.ZeroDateGMT = moment(this.ZeroUnixFloat).toISOString();
  // this.SystemId =

}
