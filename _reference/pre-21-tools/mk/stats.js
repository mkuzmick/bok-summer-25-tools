var fs = require('fs');

module.exports = function(filePath){
  var stats = fs.statSync(filePath);
  console.log(JSON.stringify(stats, null, 4));
}
