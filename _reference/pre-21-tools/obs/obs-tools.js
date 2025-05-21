const fs = require('fs')
const cp = require('child_process')
const Scene = require('./models/Scene.js')
const collectionTemplate = require('./reference/collection-template.json')
const moment = require('moment');

module.exports = async function(options){
  console.log("starting the obs tools");
  var thisScene = new Scene("test scene 001");
  console.log(JSON.stringify(thisScene, null,4));
  var newCollection = collectionTemplate;
  newCollection.sources.push(thisScene);
  newCollection.name=`test-${moment()}`
  fs.writeFileSync('/Users/mk/Desktop/newCollection-Test-001.json', JSON.stringify(newCollection, null, 4))
}
