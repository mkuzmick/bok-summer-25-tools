var cp = require("child_process");
var path = require("path");
var fs = require('fs');
const csv = require('csv-parser');

/**
 * var mainFunction - finds the loudest 2 seconds of a video file
 *
 * @param  {string} videofilePath path to the video file
 * @param  {object} settings      settings, including width, height, html
 * @param  {function} cb            err, data callback to execute
 * @return {object}               returns object with min and max frames of video
 */
var mainFunction = async function(videofilePath, settings, cb) {
  var audioDataFile = path.join(settings.outputFolder,
    (settings.basename + "_audiodata.csv"));
  if (fs.existsSync(audioDataFile)) {
    fs.unlinkSync(audioDataFile);
  }
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
        fs.appendFileSync(audioDataFile, data);
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
    fs.createReadStream(audioDataFile)
      .pipe(csv(['frame', 'level']))
      .on('data', (row) => {
        audiodataArray.push(row);
      })
      .on('end', () => {
        var minMaxResult = findMinMax(audiodataArray, "level");
        cb(null, minMaxResult);
      });
    }
  );
}

function findMinMax(arr, prop) {
  var smoothedArray = getMovingAverage(arr);
  let minEl = smoothedArray[0], maxEl = smoothedArray[0];
  for (let i = 1, len=smoothedArray.length; i < len; i++) {
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

function getMovingAverage(arr){
  var newArray = arr.map(function(e, index) {
    var sumOfValues = 0;
    for (var j = 0; j < 48; j++) {
      var elToSum = (arr[index-24+j] && arr[index-24+j].level!=="-inf") ? arr[index-24+j].level : -80;
      sumOfValues+=parseFloat(elToSum);
    }
    var theAverageLevel = sumOfValues/48;
    return {
      frame: e.frame,
      level: theAverageLevel,
      adjustment: (theAverageLevel - e.level)
    }
  });
  return newArray;
}

module.exports = mainFunction;




// use this:
//
// function streamToArray (stream) {
//   const chunks = []
//   return new Promise((resolve, reject) => {
//     stream.on('data', chunk => chunks.push(chunk))
//     stream.on('error', reject)
//     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
//   })
// }
//
// const result = await streamToString(stream)
//
// function readStream(stream, encoding = "utf8") {
//
//     stream.setEncoding(encoding);
//
//     return new Promise((resolve, reject) => {
//         let data = "";
//
//         stream.on("data", chunk => data += chunk);
//         stream.on("end", () => resolve(data));
//         stream.on("error", error => reject(error));
//     });
// }
//
// const text = await readStream(process.stdin);
