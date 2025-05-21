// note = Sophie is the BEST!!

var cp = require("child_process");

// takes a vbpath and makes a gif
function mainFunction(path) {

  var palettePath ="/Users/llf/Desktop/our-palette.png";
  var gifPath = "/Users/llf/Desktop/test-video.gif";
  var segmentPath = "/Users/llf/Desktop/test-video-segment.mov";
  console.log("the main function is working!!");
  var output = cp.spawnSync('ffprobe', [
    '-f', 'lavfi',
    '-i', 'amovie=/Users/llf/Desktop/test-video.mov,astats=metadata=1:reset=1',
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

   cp.spawnSync('ffmpeg', ['-ss', startFrame, '-i', filePath, '-t', '00:00:02',
   segmentPath]);

   cp.spawnSync('ffmpeg', ['-i', segmentPath, '-vf',
     'palettegen', palettePath]);
    console.log("done palette");
    cp.spawnSync('ffmpeg', ['-i', segmentPath, '-i',
      palettePath, '-vf', ('scale=' + '640' + ":"
      + '360'), '-y', gifPath]);


}


module.exports = mainFunction;
