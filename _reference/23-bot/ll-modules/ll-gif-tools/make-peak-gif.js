var cp = require("child_process");
var path = require("path");
var fs = require('fs');
const csv = require('csv-parser');
const { magenta, gray } = require("../utilities/mk-utilities");

async function ffprobe (videoFilePath){
  console.log("probing " + videoFilePath);
  var ffprobeData = JSON.parse(cp.spawnSync("ffprobe",[
      '-v','quiet',
      '-print_format', 'json',
      '-show_format', '-show_streams',
      videoFilePath],
      { encoding : 'utf8' })
      .stdout);
  console.log(JSON.stringify(ffprobeData, null, 4));
  return ffprobeData;
}

async function normalizeFFProbeStreams(ffprobeData){
  const streams = {}
  for (let i = 0; i < ffprobeData.streams.length; i++) {
    const element = ffprobeData.streams[i];
    if (element.codec_type == "video") {
      streams.video = element
    } else if (element.codec_type == "audio") {
      streams.audio = element
    } else if ((element.codec_type == "tmcd")) {
      streams.timecode = element
    }
  }
  return streams
}


async function makePeakGif(videofilePath, settings) {
  var options = settings ? createOptions(videofilePath, settings) : createOptions(videofilePath, {});
  const start = Date.now()
  gray(start)
  try {
    const ffprobeData = await ffprobe(videofilePath)
    const streams = await normalizeFFProbeStreams(ffprobeData)
    options.audioRate = parseFloat(streams.audio.nb_frames)/parseFloat(streams.audio.duration)
    const audioAnalysis = await analyzeAudio(videofilePath, options)
    options.peakFrame = parseFloat(audioAnalysis.max.frame)  + options.timeOffset;
    options.frameOffset = -24
    options.startFrame = parseFloat(audioAnalysis.max.frame) + options.timeOffset;
    const gifResult = await makeGif(options)
    const stillResult = await makeStill(options)
    gifResult.timeElapsed = Date.now() - start
    gray(gifResult)
  } catch (error) {
    console.log(error);
  }
}

async function makeStill(setup){
  console.log(`ffmpeg -ss ${setup.peakFrame/setup.audioRate} -i ${setup.videofilePath} -frames:v 1 -q:v ${setup.peakStillPath}`)
    cp.spawnSync('ffmpeg', [
        '-ss', (setup.peakFrame/setup.audioRate),
        '-i', setup.videofilePath,
        '-frames:v', "1",
        '-y', setup.peakStillPath
    ]);
    // fs.unlinkSync(setup.palettePath)
    // fs.unlinkSync(setup.segmentPath)
    return({path: setup.peakStillPath})
}

function createOptions(videofilePath, settings){
  var newSettings = {};
  newSettings.videofilePath = videofilePath;
  newSettings.normFilePath = videofilePath.replace(/ /g,"_");
  newSettings.outputFolder = settings.outputFolder ? settings.outputFolder 
    : process.env.PEAKGIF_OUTPUT_FOLDER ? process.env.PEAKGIF_OUTPUT_FOLDER : path.dirname(videofilePath);
  newSettings.basename = path.basename(newSettings.normFilePath, path.extname(videofilePath));
  newSettings.height = settings.height ? settings.height : 540;
  newSettings.framerate = settings.framerate ? settings.framerate : 24;
  newSettings.width = settings.width ? settings.width: 960;
  newSettings.palettePath = path.join(newSettings.outputFolder, (newSettings.basename + "_palette.png"));
  newSettings.gifPath = path.join(newSettings.outputFolder, (newSettings.basename + "_" + newSettings.height + ".gif"));
  newSettings.segmentPath = path.join(newSettings.outputFolder, (newSettings.basename + "_segment.mov"));
  newSettings.peakStillPath = path.join(newSettings.outputFolder, (newSettings.basename + "_peakStill.png"));
  newSettings.htmlPath = path.join(newSettings.outputFolder, (newSettings.basename + "_index.html"));
  newSettings.offset = settings.offset ? Number(settings.offset) : -48;
  newSettings.timeOffset = newSettings.offset/24 - 1;
  newSettings.html = settings.html ? settings.html : true;
  newSettings.audioDataPath = path.join(newSettings.outputFolder, `${newSettings.basename}_audiodata.csv`)
  return newSettings;
};


const analyzeAudio = async function (videofilePath, options) {
  if (fs.existsSync(options.audioDataPath)) { fs.unlinkSync(options.audioDataPath); }
  return new Promise( (resolve, reject) => {
      var proc = cp.spawn('ffprobe', [
          '-f', 'lavfi',
          '-i', `amovie=${videofilePath},astats=metadata=1:reset=1`,
          '-show_entries', 'frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level',
          '-of',  'csv=p=0',
        ], { encoding : 'utf8' }
      );
      proc.stderr.setEncoding("utf8");
      proc.stdout.setEncoding("utf8");
      proc.stdout.on('data', function(data) {
          try {
              // console.log(data)
              fs.appendFileSync(options.audioDataPath, data);
          } catch (err) {
          console.log("error appending");
          }
      });
      proc.stderr.on('data', function(data) {
      // console.log(data);
      });
      proc.on('close', function() {
          console.log('finished child process');
          var audiodataArray = [];
          fs.createReadStream(options.audioDataPath)
              .pipe(csv(['level']))
              .on('data', (row) => {
              audiodataArray.push({...row});
              })
              .on('end', () => {
                  var minMaxResult = findMinMax(audiodataArray, "level");
                  magenta(minMaxResult)
                  resolve(minMaxResult);
                  // magenta(audiodataArray)
                  // resolve({audiodataArray, minMaxResult})
              });
      });
  })
}

function findMinMax(arr, prop) {
  var smoothedArray = getMovingAverage(arr, 48);
  // gray(smoothedArray)
  let minEl = smoothedArray[0], maxEl = smoothedArray[0];
  for (let i = 1; i < smoothedArray.length; i++) {
    let thisVal = parseFloat(smoothedArray[i][prop]);
    if (thisVal > maxEl[prop]) {
      maxEl = smoothedArray[i]
    }
    if (thisVal < minEl[prop]) {
      minEl = smoothedArray[i]
    }
  }
  return {min: minEl, max: maxEl};
}

function getMovingAverage(arr, frames){
  var newArray = arr.map(function(e, index) {
    var sumOfValues = 0;
    for (var j = 0; j < frames; j++) {
      var elToSum = (arr[index-(frames/2)+j] && arr[index-(frames/2)+j].level!=="-inf") ? arr[index-(frames/2)+j].level : -80;
      sumOfValues+=parseFloat(elToSum);
    }
    var theAverageLevel = sumOfValues/frames;
    return {
      frame: index,
      level: theAverageLevel,
      adjustment: (theAverageLevel - e.level)
    }
  });
  // magenta(newArray)
  return newArray;
}

function makeGif(setup) {
  console.log(`ffmpeg -ss ${setup.startFrame/setup.audioRate - 1} -i ${setup.videofilePath} -t 2.0 -pix_fmt yuv420p -y ${setup.segmentPath}`)
    cp.spawnSync('ffmpeg', [
        '-ss', (setup.startFrame/setup.audioRate - 1),
        '-i', setup.videofilePath,
        '-t', 2.0, // TODO: let's add this as an option (up to a 10 second limit)
        '-pix_fmt', 'yuv420p',
        '-y', setup.segmentPath
    ]);
    cp.spawnSync('ffmpeg', [
        '-i', setup.segmentPath,
        '-vf', 'palettegen',
        '-y', setup.palettePath
    ]);
    cp.spawnSync('ffmpeg', [
        '-i', setup.segmentPath,
        '-i', setup.palettePath,
        '-vf', `scale=${setup.width}:${setup.height}`,
        '-y', setup.gifPath]);
    fs.unlinkSync(setup.palettePath)
    // fs.unlinkSync(setup.segmentPath)
    fs.unlinkSync(setup.audioDataPath)
    return({path: setup.gifPath})
}

module.exports = makePeakGif;






// const analyzeAudio = async function (videofilePath, options) {
//     const audioDataPath = path.join(options.outputFolder, `${options.basename}_audiodata.csv`)
//     // delete if already exists
//     if (fs.existsSync(audioDataPath)) { fs.unlinkSync(audioDataPath); }
//     return new Promise( (resolve, reject) => {
//         var proc = cp.spawn('ffprobe', [
//             '-f', 'lavfi',
//             '-i', `amovie=${videofilePath},astats=metadata=1:reset=1`,
//             '-show_entries', 'frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level',
//             '-of',  'csv=p=0',
//           ], { encoding : 'utf8' }
//         );
//         proc.stderr.setEncoding("utf8");
//         proc.stdout.setEncoding("utf8");
//         proc.stdout.on('data', function(data) {
//             try {
//                 // console.log(data)
//                 fs.appendFileSync(audioDataPath, data);
//             } catch (err) {
//             console.log("error appending");
//             }
//         });
//         proc.stderr.on('data', function(data) {
//         // console.log(data);
//         });
//         proc.on('close', function() {
//             console.log('finished child process');
//             var audiodataArray = [];
//             fs.createReadStream(audioDataPath)
//                 .pipe(csv(['level']))
//                 .on('data', (row) => {
//                 audiodataArray.push({...row});
//                 })
//                 .on('end', () => {
//                     // var minMaxResult = findMinMax(audiodataArray, "level");
//                     // magenta(minMaxResult)
//                     // resolve(minMaxResult);
//                     // magenta(audiodataArray)
//                     resolve("done")
//                 });
//         });
//     })
// }