var moment = require('moment');
var mk = require('../mk/utilities');


var timecodeToFcpxTs = function timecodeToFcpxmlFormat(timecode){
    var tempTc = ("willBeAFunctionOf " + timecode);
    var theHours = parseInt(timecode.split(':')[0]);
    var theMinutes = parseInt(timecode.split(':')[1]);
    var theSeconds = parseInt(timecode.split(':')[2]);
    var theFrames = parseInt(timecode.split(':')[3]);
    var theTotalFrames = (theFrames)+(24*(theSeconds+(60*(theMinutes+(60*theHours)))));
    var theFcpxFormat = ((theTotalFrames*1001) + "/24000s");
    return theFcpxFormat;
}

var shootIdAndTimecodeToDate = function(shootId, timecode) {
  var regexTest = /^\d{8}/;
  var dateRoot = shootId.slice(0,8);
  if (regexTest.test(dateRoot)) {
    var y = dateRoot.substr(0,4),
        m = (dateRoot.substr(4,2) - 1),
        d = dateRoot.substr(6,2);
    var theHours = parseInt(timecode.split(':')[0]),
        theMinutes = parseInt(timecode.split(':')[1]),
        theSeconds = parseInt(timecode.split(':')[2]),
        theFrames = parseInt(timecode.split(':')[3]);
    var D = new Date(y,m,d, theHours, theMinutes, theSeconds);
    return D;
  }
  else {
    console.log(shootId + "'s dateRoot " + dateRoot + " is not a valid date string");
  }
}

var timecodeToMilliseconds = function(timecode){
  var theHours = parseInt(timecode.split(':')[0]);
  var theMinutes = parseInt(timecode.split(':')[1]);
  var theSeconds = parseInt(timecode.split(':')[2]);
  var theFrames = parseInt(timecode.split(':')[3]);
  console.log("theHours=" + theHours);
  console.log("theMinutes=" + theMinutes);
  console.log("theSeconds=" + theSeconds);
  console.log("theFrames=" + theFrames);
  var theTotalFrames = (theFrames)+(24*(theSeconds+(60*(theMinutes+(60*theHours)))));
  console.log("theTotalFrames=" + theTotalFrames);
  var milliseconds = theTotalFrames*1001000/24000;
  console.log("got milliseconds for " + timecode);
  console.log("= " + milliseconds);
  return milliseconds;
}

 var inTcAndFramesToOutTc = function(timecode, frames) {
  console.log("timecode = " + timecode);
  console.log("frames = " + frames);
  var inHours = parseInt(timecode.split(':')[0]);
  var inMinutes = parseInt(timecode.split(':')[1]);
  var inSeconds = parseInt(timecode.split(':')[2]);
  var inFrames = parseInt(timecode.split(':')[3]);
  var inTotalFrames = (inFrames)+(24*(inSeconds+(60*(inMinutes+(60*inHours)))));
  console.log("in frames = " + inTotalFrames );
  var outTotalFrames = inTotalFrames + parseInt(frames);
  console.log("out frames = " + outTotalFrames);
  var outTimecode = framesToTimecode(outTotalFrames);
  return outTimecode
}


var framesToTimecode = function(frames){
  if (isNaN(frames)) {
    frames = parseInt(frames);
  }
  var the_frames=(frames % 24);
  var seconds = (frames-the_frames)/24;
  var the_seconds=(seconds%60);
  var minutes = (seconds-the_seconds)/60;
  var the_minutes = minutes%60;
  var the_hours = (minutes-the_minutes)/60;
  var theTc_colon_string = ((("00" + the_hours).slice(-2))+ ":" + (("00" + the_minutes).slice(-2))+ ":" + (("00" + the_seconds).slice(-2))+ ":" + (("00" + the_frames).slice(-2)));
  return theTc_colon_string;
}

var timecodeToFrames = function (timecode){
  console.log("starting timecodeToFrames with " + timecode);
  var theHours = parseInt(timecode.split(':')[0]);
  var theMinutes = parseInt(timecode.split(':')[1]);
  var theSeconds = parseInt(timecode.split(':')[2]);
  var theFrames = parseInt(timecode.split(':')[3]);
  var theTotalFrames = (theFrames)+(24*(theSeconds+(60*(theMinutes+(60*theHours)))));
  return theTotalFrames;
}

var framesToTimecodeForFilename = function(frames){
  var the_frames=(frames % 24);
  var seconds = (frames-the_frames)/24;
  var the_seconds=(seconds%60);
  var minutes = (seconds-the_seconds)/60;
  var the_minutes = minutes%60;
  var the_hours = (minutes-the_minutes)/60;
  var theTc_string = ((("00" + the_hours).slice(-2))+(("00" + the_minutes).slice(-2))+(("00" + the_seconds).slice(-2))+(("00" + the_frames).slice(-2)));
  return theTc_string;
}

var getZeroUnix = function(slateUnix, slateTimecode){
  console.log('starting getZeroUnix with ');
  mk.yellow('slateUnix', slateUnix);
  mk.yellow('slateTimecode', slateTimecode);
  var durationInMilliseconds = timecodeToMilliseconds(slateTimecode);
  mk.yellow('durationInMilliseconds', durationInMilliseconds);
  var result = parseInt(slateUnix) - durationInMilliseconds;
  mk.purple(result)
  return result
}

module.exports.timecodeToFcpxTs = timecodeToFcpxTs;
module.exports.shootIdAndTimecodeToDate = shootIdAndTimecodeToDate;
module.exports.timecodeToFrames = timecodeToFrames;
module.exports.inTcAndFramesToOutTc = inTcAndFramesToOutTc;
module.exports.framesToTimecode = framesToTimecode;
module.exports.framesToTimecodeForFilename = framesToTimecodeForFilename;
module.exports.getZeroUnix = getZeroUnix;
module.exports.timecodeToMilliseconds = timecodeToMilliseconds;
