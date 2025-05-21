var cp = require('child_process');
var path = require('path');
var fs = require('fs');

module.exports = async function(videoFilePath, options){

  console.log("probing " + videoFilePath);
  var ffprobeData = JSON.parse(cp.spawnSync("ffprobe",[
      '-v','quiet',
      '-print_format', 'json',
      '-show_format', '-show_streams',
      videoFilePath],
      { encoding : 'utf8' })
      .stdout);
  // console.log(JSON.stringify(ffprobeData, null, 4));
  console.log(process.env.TESTS_FOLDER);
    console.log(process.env.FFPROBE_PATH);
  var pathForJson = path.join(process.env.TESTS_FOLDER, (path.basename(videoFilePath) + '.json'))
  if (options && options.write) {
    fs.writeFileSync(pathForJson, JSON.stringify(ffprobeData, null, 4));
  }
  return ffprobeData;
}
