#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

const audioRegex = /(aiff|aif)/i;

var sourceFolder = '/Volumes/134_2050/all_sounds/aiff_samples';
var outputFolder = '/Volumes/134_2050/all_sounds/mp3_samples';
var allTheFiles = fs.readdirSync(sourceFolder);

for (var i = 0; i < allTheFiles.length; i++) {
  if (audioRegex.test(allTheFiles[i])) {
    convertFile(allTheFiles[i])
  } else {
    console.log(allTheFiles[i] + " doesn't seem to be the right format");
  }
}

function convertFile(file){
  var basename = path.basename(file, '.aiff');
  var options = [
    '-i', path.join(sourceFolder, file),
    '-y',
    '-f', 'mp3',
    '-acodec', 'libmp3lame',
    '-ab', 320000,
    '-ar', 44100,
    path.join(outputFolder, (basename + ".mp3"))
  ]
  var output = cp.spawnSync('ffmpeg', options, {
      stdio: [ 0, 'pipe', 2 ]
      }
  );
}
