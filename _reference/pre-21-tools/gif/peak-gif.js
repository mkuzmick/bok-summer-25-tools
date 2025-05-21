var cp = require("child_process");
var path = require("path");
var makeHtml = require('./makeHtml');
var fse = require('fs-extra');
var analyzeAudio = require('../ffmpeg/analyze-audio');
var s3 = require('../aws/s3-tools');
var slackBlocks = require('../slack/slack-blocks');
var blx = require('../slack/slack-block-builder');
var at = require('../airtable/airtable-tools');
var Airtable = require('airtable');

async function mainFunction(videofilePath, settings) {
  var setup = cleanSettings(videofilePath, settings);
  // console.log(`cleaned setup:\n${JSON.stringify(setup, null, 4)}`);
  analyzeAudio(videofilePath, setup, function(err, data){
    if (err) {
      console.log(err);
    } else {
      setup.audioData = data;
      setup.startFrame = parseFloat(data.max.frame) + setup.timeOffset;
      cp.spawnSync('ffmpeg', [
        '-ss', setup.startFrame,
        '-i', setup.videofilePath,
        '-t', 2.0, // TODO: let's add this as an option (up to a 10 second limit)
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
        '-y',
        setup.gifPath]);
      if (setup.html) {
        fse.writeFileSync(setup.htmlPath, makeHtml(setup.gifPath, setup.palettePath, (JSON.stringify(setup, null, 4))), 'utf-8');
        cp.spawnSync('open', [setup.htmlPath]);
      }
      s3.uploadPromise(setup.gifPath)
        .then(data=>{console.log(`uploaded to s3: ${JSON.stringify(data, null, 4)}`); return data})
        .then(async function(data){
          var base = new Airtable({
            apiKey: process.env.AIRTABLE_API_KEY
            }).base(process.env.AIRTABLE_PEAKGIF_BASE);
          let record = {
            FILENAME: setup.basename,
            URL: data.Location,
          }
          var atResult = await at.sendToAirtable(record, base, "GIFS");
          return {...data, atResult: atResult};
        })
        .then(data => {
          console.log(`data in final step = \n${JSON.stringify(data, null, 4)}`);
          var blocks = [blx.image(
            data.Location,
            `peakGif: ${setup.basename}`
          )];
          console.log(JSON.stringify(blocks, null, 4));
          slackBlocks(blocks, process.env.SLACK_LOG_OF_OPERATIONS_CHANNEL);
        })
        .catch(err=>{console.log(err);})
    }
  });
}

function cleanSettings(videofilePath, settings){
  var newSettings = {};
  newSettings.videofilePath = videofilePath;
  newSettings.normFilePath = videofilePath.replace(/ /g,"_");
  newSettings.outputFolder = settings.outputFolder ? settings.outputFolder : path.dirname(videofilePath);
  newSettings.basename = path.basename(newSettings.normFilePath, path.extname(videofilePath));
  newSettings.height = settings.height ? settings.height : 360;
  newSettings.width = settings.width ? settings.width: 640;
  newSettings.palettePath = path.join(newSettings.outputFolder, (newSettings.basename + "_palette.png"));
  newSettings.gifPath = path.join(newSettings.outputFolder, (newSettings.basename + "_" + newSettings.height + ".gif"));
  newSettings.segmentPath = path.join(newSettings.outputFolder, (newSettings.basename + "_segment.mov"));
  newSettings.htmlPath = path.join(newSettings.outputFolder, (newSettings.basename + "_index.html"));
  newSettings.offset = settings.offset ? Number(settings.offset) : 0;
  newSettings.timeOffset = newSettings.offset/24 - 1;
  newSettings.html = settings.html ? settings.html : true;
  return newSettings;
};

module.exports = mainFunction;
