var fs = require('fs');

module.exports = function(object){
  fs.writeFileSync(`${ROOT_DIR}/data/object.json`, JSON.stringify(object, null, 4))
}
