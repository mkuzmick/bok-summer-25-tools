// note = Sophie is the BEST!!

var cp = require("child_process");
var path = require("path");
var makeHtml = require('./makeHtml');
var fse = require('fs-extra');

// takes a vbpath and makes a gif

function mainFunction(settings) {
  var normFilePath = settings.videofilePath.replace(/ /g,"_");
  var theBasename = path.basename(normFilePath, path.extname(videofilePath));
  var outputFolder = path.dirname(settings.videofilePath);
  if (settings && settings.height) {
    var height = settings.height
  } else {
    var height = "360";
  }
  if (settings && settings.width) {
    var height = settings.width
  } else {
    var height = "640";
  }
  var palettePath = path.join(outputFolder,
    (theBasename + "_palette.png"));
  var gifPath = path.join(outputFolder,
    (theBasename + "_" + height + ".gif"));
  var segmentPath = path.join(outputFolder,
    (theBasename + "_segment.mov"));
  var htmlPath = path.join(outputFolder,
    (theBasename + "_index.html"));
  var output = cp.spawnSync('ffprobe', [
      '-f', 'lavfi',
      '-i', `amovie=${videofilePath},astats=metadata=1:reset=1`,
      '-show_entries', 'frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level',
      '-of',  'csv=p=0',
      '-print_format', 'json',
      '-show_format', '-show_streams',
    ], { encoding : 'utf8' }
  ).stdout;
   var parsedOutput = JSON.parse(output);
   var arr = [];
   for (var i=0; i < parsedOutput.frames.length; i++) {
     var obj = parsedOutput.frames[i];
     var number = obj.tags["lavfi.astats.Overall.RMS_level"];
     if (isNaN(number)) {
       console.log("not a number");
     }
     else {
       arr.push(parseFloat(number));;
     };
   };
   var maximum = Math.max.apply(null, arr);
   var timestamp = "";
   console.log(maximum);
   for (var i=0; i < parsedOutput.frames.length; i++) {
     var obj = parsedOutput.frames[i];
     var number = obj.tags["lavfi.astats.Overall.RMS_level"];
     if (parseFloat(number) == maximum) {
       timestamp = obj["pkt_pts_time"];
     };
   };
   console.log(timestamp);
   var startFrame = parseFloat(timestamp) - 1;
   cp.spawnSync('ffmpeg', ['-ss', startFrame, '-i', videofilePath, '-t', '00:00:02',
   segmentPath]);
   cp.spawnSync('ffmpeg', ['-i', segmentPath, '-vf',
     'palettegen', palettePath]);
    console.log("done palette");
    cp.spawnSync('ffmpeg', ['-i', segmentPath, '-i',
      palettePath, '-vf', ('scale=' + '640' + ":"
      + '360'), '-y', gifPath]);
    if (settings.html) {
      fse.writeFileSync(htmlPath, makeHtml(gifPath, palettePath, (JSON.stringify(settings, null, 4))), 'utf-8');
      cp.spawnSync('open', [htmlPath]);
    }
    console.log("done");
}

module.exports = mainFunction;
