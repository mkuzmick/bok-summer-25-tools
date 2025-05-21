var getPixels = require("get-pixels");

var analyzePng = function(file){
  return new Promise(function(resolve, reject) {
    getPixels(file, function(err, pixels){
      var pixelData = {};
      var pixelDataArray = [];
      for (var pixel in pixels.data) {
        if (pixels.data.hasOwnProperty(pixel)) {
          switch (pixel % 4) {
            case 0:
              pixelData.index = Math.floor(pixel/4);
              pixelData.red = pixels.data[pixel]
              break;
            case 1:
              pixelData.green = pixels.data[pixel]
              break;
            case 2:
              pixelData.blue = pixels.data[pixel]
              break;
            case 3:
              pixelData.alpha = pixels.data[pixel]
              pixelDataArray.push(pixelData);
              pixelData={};
              break;
            default:
          }
        }
      }
      // for (var i = 0; i < pixelDataArray.length; i++) {
      //   console.log(JSON.stringify(pixelDataArray[i]));
      // }
      resolve(pixelDataArray);
    })
  });
}

module.exports.analyzePng = analyzePng;
