const listTools = require('../utilities/list-of-files');
const writeJson = require('../utilities/write-json');
const path = require('path');
const moment = require('moment');
const chalk = require('chalk');
const schedule = require('node-schedule');
const fs = require('fs');

var fullProbe = async function (settings) {
  // get a list of all the video files in the folder
  console.log(`about to probe Synology with settings:\n${JSON.stringify(settings, null, 4)}`);
  var theSynologyFiles = await listTools.allFilesWithRegex(settings.path, /\.(mp4|m4v|mov|mxf|mts)$/i);
  var jsonPath = await writeJson(theSynologyFiles);
  return (`done`);
}

var makeIndex = async function (settings) {
  // get a list of all the video files in the folder
  console.log(`about to probe Synology with settings:\n${JSON.stringify(settings, null, 4)}`);
  var theSynologyFiles = await listTools.allFiles(settings.path);
  var jsonPath = await writeJson(theSynologyFiles, `${process.env.TOOLS_OUTPUT_FOLDER}/synology-indexes/${path.basename(settings.path)}-list-${moment().format('YYYYMMDD-HHmmss.SSS')}.json`);
  return (`done`);
}

var scheduleChecklistTasks = async function (checklistPath) {
  console.log("launching scheduled task");
  var CronJob = require('cron').CronJob;
  var job = new CronJob(
    '*/5 * * * * *',
    function() { doOneTask(checklistPath) },
    function() {
      console.log(`completed Cron task`);
      this.stop();
      return;
    },
    true,
    'America/New_York'
  );
}

async function doOneTask(checklistPath){
  console.log(`current checklistPath=${checklistPath}. Let's rename to ${path.dirname(checklistPath)}/${path.basename(checklistPath, '.json')}-archived-${moment().valueOf()}.json`);
  // var checklist = checklistFromJson(checklistPath);
  // var archiveFilePath = await writeJson(checklist, `${path.dirname(checklistPath)}/${path.basename(checklistPath, '.json')}-archived-${moment().valueOf()}.json`);
  // var newChecklist = {
  //   ...checklist,
  //   todo: checklist.todo.slice(1),
  //   done: [...checklist.done, checklist.todo[0]]
  // }
  // var updatedChecklist = await writeJson(newChecklist, checklistPath);
  // console.log(`moving ${checklist.todo[0]} from todo to done`);
}

async function checklistFromJson(file){
  var fileList = require(file);
  var date = new Date();
  var checklist = {
    updated: [date],
    lastUpdate: date,
    todo: [],
    done: [],
    nonVideoPaths: {
      stills: [],
      misc: []
    }
  };
  for (var i = 0; i < fileList.length; i++) {
    console.log(`checking ${fileList[i]}`);
    if (/\.(mp4|m4v|mov|mxf|mts)$/i.test(fileList[i])) {
      checklist.todo.push(fileList[i])
    } else if (/\.(jpeg|jpg|cr2|png|tiff|dng|rw2)$/i.test(fileList[i])) {
      checklist.nonVideoPaths.stills.push(fileList[i])
    } else {
      checklist.nonVideoPaths.misc.push(fileList[i])
    }
  }
  return checklist;
}

module.exports = async function (settings) {
  var started = new Date();
  console.log(`started at ${started.getTime()}`);
  if (settings.index) {
    var result = await makeIndex({path: settings.path});
    var done = new Date();
    console.log(`operation took ${done.getTime() - started.getTime()}`);
    return result;
  } else if (settings.schedule) {
    console.log(`firing the scheduleChecklistTasks function at ${moment()}`);
    scheduleChecklistTasks(settings.json);
  } else if (settings.makeChecklists) {
    if (!settings.folder) {
      console.log(`you need to add a --folder=/your/folder/path value`);
    } else {
      var jsonPaths = fs.readdirSync(settings.folder).map(e=>{ return `${settings.folder}/${e}` });
      for (var i = 0; i < jsonPaths.length; i++) {
        if (/\.json$/i.test(jsonPaths[i])) {
          console.log(`${jsonPaths[i]} is a json file`);
          var thisChecklist = checklistFromJson(jsonPaths[i]);
          var checklistName = path.basename(jsonPaths[i]).split("-")[0];
          var done = new Date();
          console.log(`let's save this json as ${ROOT_DIR}/data/checklists/peak-gif/peakGif-checklist-${checklistName}.json`);
        } else {
          console.log(`${jsonPaths[i]} is not a json file`);
        }
        // var result = await checklistFromJson(settings.json);
        // console.log(chalk.blue(JSON.stringify(result, null, 4)));

        // console.log(`operation took ${done.getTime() - started.getTime()}`);
        // return `done and would have ${result.todo.length} files to peakGif`;
      }
    }
  } else if (settings.full) {
    var result = await fullProbe({path: settings.path});
    var done = new Date();
    console.log(`operation took ${done.getTime() - started.getTime()}`);
    return result;
  } else {
    console.log("need to get --index, --makeChecklist, or --full flags for this command right now");
    return("no result");
  }
}
