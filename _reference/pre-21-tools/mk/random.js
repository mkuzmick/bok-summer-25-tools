const csv = require('csv-parser');


var reformatCsv(csv){
  var geoDataArray = [];
  fs.createReadStream(csv)
    .pipe(csv(['frame', 'level']))
    .on('data', (row) => {
      audiodataArray.push(row);
    })
    .on('end', () => {
      var minMaxResult = findMinMax(audiodataArray, "level");
      cb(null, minMaxResult);
    });
  }
}

module.exports = reformatCsv;
