var cp = require('child_process');
var path = require('path');
var fs = require('fs');

module.exports = async function(videoFilePath, options){
  console.log("probing " + videoFilePath);
  var ffprobeData = JSON.parse(cp.spawnSync('ffprobe',[
      '-v','quiet',
      '-print_format', 'json',
      '-show_format', '-show_streams',
      videoFilePath],
      { encoding : 'utf8' })
      .stdout);
  return ffprobeData;
}
