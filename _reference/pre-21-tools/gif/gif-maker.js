var cp = require('child_process');
var fse = require('fs-extra');
var path = require('path');
var makeHtml = require('./makeHtml');
var analyzePng = require('./visual-analysis').analyzePng;

module.exports = async function(settings){
  // console.log("these are the arguments hitting makeTheGif " + JSON.stringify(settings));
  var filePath;
  if (settings.gif) {
    filePath = settings.gif;
  } else {
    filePath = settings._[0]
  }
  var normFilePath = filePath.replace(/ /g,"_");
  if (!settings.gifFolder) {
    settings.gifFolder=path.dirname(filePath)
  };
  var gifBasename = path.basename(normFilePath, path.extname(filePath));
  var palettePath = path.join(settings.gifFolder,
    (gifBasename + "_palette.png"));
  var height = settings.height ? settings.height : 270;
  var width = settings.width ? settings.width : 480;
  var gifPath = path.join(settings.gifFolder,
    (gifBasename + '_' + height
    + ".gif"));
  var htmlPath = path.join(settings.gifFolder,
    (gifBasename + "_index.html"));
  cp.spawnSync(process.env.FFMPEG_PATH, ['-i', filePath, '-vf',
    'palettegen', palettePath]);
  cp.spawnSync(process.env.FFMPEG_PATH, ['-i', filePath, '-i',
    palettePath, '-vf', ('scale=' + width + ":"
    + height), '-y', gifPath]);
  if (settings.html) {
    fse.writeFileSync(htmlPath, makeHtml(gifPath, palettePath, (JSON.stringify(settings, null, 4))), 'utf-8');
    cp.spawnSync('open', [htmlPath]);
  }
  var pixelDataArray = await analyzePng(palettePath);
  console.log(JSON.stringify(pixelDataArray));
  console.log("htmlPath: " + htmlPath);
  return
};
