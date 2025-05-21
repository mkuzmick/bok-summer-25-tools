#!/usr/bin/env node

const figlet = require("figlet");
const clear = require("clear");
const llog = require("learninglab-log");
const hijackBot = require("./src/bots/audio-hijack-bot");
const trailerBot = require("./src/bots/trailer-bot");
const capture = require("./src/tools/capture");
const path = require("path");
const { at2md } = require('./airtable/airtable-to-markdown');
const resolve2stills = require('./src/tools/resolve-2-stills');

require("dotenv").config({ path: __dirname + `/.env.cli` });

// Store any arguments passed in using yargs
const yargs = require("yargs").argv;

// Handle un-hyphenated arguments
yargs._.forEach((arg) => {
  yargs[arg] = true;
});

// Determine shootFolder based on yargs.capture or current working directory
let shootFolder = null;

if (yargs.capture && yargs.capture !== true) {
  // Use the value passed to yargs.capture as the shootFolder
  shootFolder = path.resolve(yargs.capture);
} else if (yargs.capture === true) {
  // Use the current working directory as the shootFolder
  shootFolder = process.cwd();
}



// Options: rename, makefolders, proxy, proxyf2
if (yargs.watch_hijack || yargs.hijack) {
  hijackBot.hijackWatcher({
    watchFolder: process.env.HIJACK_WATCH_FOLDER,
    archiveFolder: process.env.HIJACK_ARCHIVE_FOLDER,
  });
} else if (yargs.capture) {
  if (!shootFolder) {
    console.error("Error: No shoot folder specified.");
    process.exit(1);
  }
  console.log("Launching...");
  console.log("ShootFolder:", shootFolder);
  capture(shootFolder);
} else if (yargs.resolve2stills || yargs['resolve-to-stills']) {
  // Accept folder as argument
  const folder = (typeof yargs.resolve2stills === 'string' && yargs.resolve2stills !== 'true')
    ? yargs.resolve2stills
    : (typeof yargs['resolve-to-stills'] === 'string' && yargs['resolve-to-stills'] !== 'true')
      ? yargs['resolve-to-stills']
      : process.cwd();
  if (!folder) {
    console.error('Error: No folder specified for --resolve2stills');
    process.exit(1);
  }
  resolve2stills(folder);
} else if (yargs.trailer) {
  // Run the script with a video file argument
  const videoFile = yargs.trailer;
  if (!videoFile) {
    console.error("Usage: node processVideo.js <video-file>");
    process.exit(1);
  }
  trailerBot({ inputFile: videoFile });
} else if (yargs.at2md) {
  if (!process.env.AIRTABLE_API_TOKEN) {
    console.error('Error: AIRTABLE_API_TOKEN not found in environment');
    process.exit(1);
  }

  if (!yargs.base || !yargs.table || !yargs.view) {
    console.error('Error: Please provide --base, --table, and --view parameters');
    process.exit(1);
  }
  at2md({
    base: yargs.base,
    table: yargs.table,
    view: yargs.view,
    apiToken: process.env.AIRTABLE_API_TOKEN,
    formatOptions: {
      heroField: yargs.hero
    }
  }).catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
} else {
  console.log("Sorry, you didn't enter a recognized command.");
}
