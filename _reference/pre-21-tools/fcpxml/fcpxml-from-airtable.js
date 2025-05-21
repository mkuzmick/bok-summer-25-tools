const xml2js = require('xml2js');
const builder = new xml2js.Builder({attrkey: "_attr"})
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const Airtable = require('airtable');
const airtableTools = require('../airtable/airtable-tools.js');
const makeProjectFromRecord = require('./fcpxml-project-from-record');

module.exports = async function(options){
  console.log("\nmake fcpxml with options: ");
  console.log(JSON.stringify(options, null, 4));
  options.airtableList = await getListFromAirtable();
  var library = {
    fcpxml: {
      "_attr": {
        version: "1.8"
      },
      resources: makeResources(),
      library: makeLibrary(options),
    }
  }
  // console.log(JSON.stringify(library, null, 4));
  var xmlString = await builder.buildObject(library);
  fs.writeFileSync(path.join(process.env.TESTS_FOLDER, 'test.fcpxml'), xmlString)
  cp.spawnSync('open', ['-a', 'Final Cut Pro', path.join(process.env.TESTS_FOLDER, 'test.fcpxml')]);
  // cp.spawnSync('open', ['-a', 'Atom', path.join(process.env.TESTS_FOLDER, 'test.fcpxml')]);
}

function makeLibrary(options){
  var result = {
    "_attr": {
      location: options.location ? options.location : ""
    },
    "event": [
      {
        "_attr": {
          "name": "Projects"
        },
        "project": []
      }
    ]
  }
  if (options.airtableList) {
    for (var i = 0; i < options.airtableList.length; i++) {
      result.event[0].project.push(makeProjectFromRecord(options.airtableList[i], i));
    }
  } else {
    console.log("didn't get an airtable list.");
    return;
  }
  return result;
}

function makeResources(resourceArray){
  // console.log("starting makeResources with resourceArray" + resourceArray);
  var resources = {
    "format": [
        {
            "_attr": {
                "id": "r1",
                "name": "FFVideoFormat1080p2398",
                "frameDuration": "1001/24000s",
                "width": "1920",
                "height": "1080",
                "colorSpace": "1-1-1 (Rec. 709)"
            }
        }
    ],
    "effect": [
        {
            "_attr": {
                "id": "r2",
                "name": "Custom",
                "uid": ".../Titles.localized/Build In:Out.localized/Custom.localized/Custom.moti"
            }
        }
    ],
    "asset": []
  };
  if (resourceArray && resourceArray.length > 0) {
    console.log("resources!");
    for (var i = 0; i < resourceArray.length; i++) {
      resources.asset.push(makeAsset(resourceArray[i], i))
    }
  }
  return resources
}

function makeAsset(asset, i) {
  // var result = {
  //     "_attr": {
  //         "id": "r2",
  //         "name": "20190620_001_LLUFLab_LRPhotoshop_C300a_001",
  //         "uid": "B45B30730B3BC5E91F647022D9291FF6",
  //         "src": "file:///Volumes/mk_storage/m2s_tests/20190620_001_LLUFLab_LRPhotoshop_h264_1080/20190620_001_LLUFLab_LRPhotoshop_C300a_001.mov",
  //         "start": "1298991694/24000s",
  //         "duration": "146378232/24000s",
  //         "hasVideo": "1",
  //         "format": "r1",
  //         "hasAudio": "1",
  //         "audioSources": "1",
  //         "audioChannels": "2",
  //         "audioRate": "48000"
  //     }
  // }
  var result = {
    "_attr": {
        "id": ("r" + (i + 1)),
        "name": (asset + "20190620_001_LLUFLab_LRPhotoshop_C300a_00" + i)
    }
  }
  return result;
}

async function getListFromAirtable(){
  console.log("\ngetting list from Airtable . . .\n");
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_SUMMER2019_BASE);
  // make all of these come from input or config ultimately
  try {
    var airtableResult = await airtableTools.findMany({
      base: base,
      table: "FcpxProjectsList",
      view: "Grid view",
      maxRecords: 100
    });
  } catch (e) {
    console.log("error with getListFromAirtable");
    console.log(e);
  } finally {

  }
  return airtableResult;
}
