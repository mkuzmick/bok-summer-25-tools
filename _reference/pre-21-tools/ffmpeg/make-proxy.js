var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var movRegex = /(mov|mp4|mxf|mts|m4v)/i;
var ffprobeToJson = require('./ffprobe-to-json');

var transcodeFolder = async function(folder, options){
  var theFiles = fs.readdirSync(folder);
  if (options && options.proxyFolder) {
    var proxyFolder = path.join(proxyFolder, (path.basename(folder) + '_proxy'));
  } else {
    var proxyFolder = path.join(path.dirname(folder), (path.basename(folder) + '_proxy'));
  }
  if (!fs.existsSync(proxyFolder)) {
    fs.mkdirSync(proxyFolder, {recursive: true})
  }
  console.log("proxyFolder is " + proxyFolder);
  console.log(JSON.stringify(theFiles, null, 4));
  for (var i = 0; i < theFiles.length; i++) {
    if (movRegex.test(theFiles[i])) {
      console.log("this is a movie: " + theFiles[i]);
      await transcodeFile(
        path.join(folder, theFiles[i]),
        path.join(proxyFolder, theFiles[i]),
        {
          crfVal: (options && options.crf) ? options.crf : '23'
        }
      );
    } else {
      console.log(theFiles[i] + " doesn't seem to be a movie");
    }
  }
}

var transcodeSingleFile = async function (file, options) {
  console.log("trying to transcode single file");
  var proxyFolder = path.join(path.dirname(file), `${path.basename(file)}_proxy`);
  if (!fs.existsSync(proxyFolder)){
    fs.mkdirSync(proxyFolder);
  }
  if (movRegex.test(file)){
    console.log(`${file} is a movie file`);
    await transcodeFile(
      file,
      path.join(proxyFolder, path.basename(file)),
      {
        crfVal: (options && options.crf) ? options.crf : '23'
      }
    );
  }
}

var transcodeFile = async function(file, proxyPath, options){
  await cp.spawnSync('ffmpeg', [
    '-i', file,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    // '-vf', ('scale='+ outputWidth +':'+outputHeight ),
    '-preset', 'slow',
    '-crf', (options && options.crfVal) ? options.crfVal : '23',
    '-ac', '2',
    '-c:a', 'aac',
    '-b:a', '128k',
    proxyPath
  ], {
    stdio: [
      0, // Use parent's stdin for child
      'pipe', // Pipe child's stdout to parent
      2 // Direct child's stderr to a file
    ]
  });
}

function getDesiredDimensions(videoFilePath){
  var options = ['-v', 'error', '-print_format', 'json', '-select_streams', 'v:0', '-show_entries', 'stream=width,height'];
  var output = JSON.parse(ffprobetools.ffprobeSyncSimple(videoFilePath, options));
  var outputWidth=1920;
  var outputHeight=1080;
  console.log(output.streams[0].width + " is the width");
  if (output.streams[0].height && (output.streams[0].height>1080)) {
    console.log(videoFilePath + " has height larger than 1080: " + output.streams[0].height);
    outputWidth=output.streams[0].width/(output.streams[0].height/1080);
    console.log("making outputWidth " + outputWidth);
  }
  else if (output.streams[0].height && (output.streams[0].height==1080)) {
    console.log(videoFilePath + " has height of exactly 1080: " + output.streams[0].height);
  }
  else if (output.streams[0].height && (output.streams[0].height<1080)) {
    console.log(videoFilePath + " has height of less than 1080: " + output.streams[0].height);
    outputWidth=output.streams[0].width;
    outputHeight=output.streams[0].height;
  }
  else {
    console.log("something went wrong--perhaps this is not a video file");
  }
  return {outputWidth: outputWidth, outputHeight: outputHeight};
}

module.exports.transcodeFile = transcodeFile;
module.exports.transcodeSingleFile = transcodeSingleFile;
module.exports.transcodeFolder = transcodeFolder;
