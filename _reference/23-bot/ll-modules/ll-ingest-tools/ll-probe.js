var cp = require('child_process');
var path = require('path');
var fs = require('fs');

module.exports = async function(videoFilePath){
  console.log("probing " + videoFilePath);
  
  var ffprobeData = JSON.parse(cp.spawnSync('ffprobe',[
      '-v','quiet',
      '-print_format', 'json',
      '-show_format', '-show_streams',
      videoFilePath],
      { encoding : 'utf8' })
      .stdout);
  // Get the file name and extension
    const { dir, name, ext } = path.parse(videoFilePath);

    // Build the new file path with a '.json' extension
    const jsonFilePath = path.join(dir, `${name}.json`);

    // Write the JSON data to the new file
    fs.writeFileSync(jsonFilePath, JSON.stringify(ffprobeData, null, 4));
  return ffprobeData;
}
