var cp = require('child_process');

// requires options.seconds, options.newDateString, options.videoFilePath, options.stillFilePath

module.exports = function(options){
  console.log("making still for");
  console.log(JSON.stringify(options, null, 4));
  cp.spawnSync(process.env.FFMPEG_PATH, [
    '-ss', options.seconds,
    '-i', options.videoFilePath,
    '-vframes', '1',
    '-q:v', '5',
    options.stillFilePath]);
  // cp.spawnSync('touch', ['-t', options.newDateString, options.stillFilePath]);
}
