var pkg = require('../../package.json');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);

exports.setConfig = function(yargs){
  console.log("setting config with yargs");
  console.log(JSON.stringify(yargs));
  // check for config options and set
  if (yargs.outputFolder){
    conf.set('outputFolder', yargs.outputFolder)
  }
  if (yargs.gifFolder){
    console.log("setting gifFolder");
    conf.set('gifFolder', yargs.gifFolder);
  }
  if (yargs.randomStills){
    console.log("setting randomStills");
    conf.set('randomStills', true);
  }
  console.log("config is now:");
  console.log(JSON.stringify(conf.all, null, 4));
}

exports.getConfig = function(){
  console.log("getting config");
  var config = conf.all
  return config;
}
