var cp = require('child_process');

var getMetadata = function(photoPath) {
  console.log("getting metadata for " + photoPath);
  var exifData = JSON.parse(cp.spawnSync(
    'exiftool', [
      '-j', photoPath
    ],
    { encoding: 'utf8' }).stdout);
  return exifData;
}

module.exports = getMetadata;
