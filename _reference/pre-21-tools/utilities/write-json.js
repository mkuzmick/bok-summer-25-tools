const fs = require('fs');
const moment = require('moment');
const path = require('path');

module.exports = function(object, filepath){
  if (!filepath) {
    try {
      var filepath = path.join(process.env.TOOLS_OUTPUT_FOLDER, 'json-output', `write-json-output-${moment().format('YYYYMMDD-HHmmss.SSS')}.json`);
      fs.writeFileSync(filepath, JSON.stringify(object, null, 4));
      console.log(`to open your json file, copy this line and enter it in terminal:`);
      console.log(`atom ${filepath}`);
      return filepath;
    } catch (e) {
      console.log(e, `\nlooks like there was a problem. Check to see if you have a TOOLS_OUTPUT_FOLDER in your .env file, that there's a json-output folder in it, and that everything else checks out.`);
    }
  } else {
    fs.writeFileSync(filepath, JSON.stringify(object, null, 4));
    console.log(`to open your json file, copy this line and enter it in terminal:`);
    console.log(`atom ${filepath}`);
    return filepath;
  }
}
