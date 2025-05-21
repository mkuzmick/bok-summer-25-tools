const xml2js = require('xml2js');
const builder = new xml2js.Builder({attrkey: "_attr"})
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

module.exports = async function(options){
  console.log("make fcpxml with options: ");
  console.log(JSON.stringify(options, null, 4));
  var numberOfProjects = options.projects ? options.projects : 0;
  var library = {
    fcpxml: {
      "_attr": {
        version: "1.8"
      },
      resources: makeResources(),
      library: makeLibrary(options),
    }
  }
  console.log(JSON.stringify(library, null, 4));
  var xmlString = await builder.buildObject(library);
  console.log(xmlString);
  fs.writeFileSync(path.join(process.env.TESTS_FOLDER, 'test.fcpxml'), xmlString)
  cp.spawnSync('open', ['-a', 'Final Cut Pro', path.join(process.env.TESTS_FOLDER, 'test.fcpxml')]);
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
  if (options.projects > 0) {
    for (var i = 0; i < options.projects; i++) {
      result.event[0].project.push(makeProject(i));
    }
  }
  return result;
}

function makeResources(resourceArray){
  console.log("starting makeResources with resourceArray" + resourceArray);
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

function makeProject(i) {
  console.log("making a project!");
  return {
      "_attr": {
          "name": ("Project " + i),
      },
      "sequence": [
          {
              "_attr": {
                  "duration": "600600/120000s",
                  "format": "r1",
                  "tcStart": "0s",
                  "tcFormat": "NDF",
                  "audioLayout": "stereo",
                  "audioRate": "48k"
              },
              "spine": [

                    {
                        "title": [
                            {
                                "_attr": {
                                    "name": "project " + (i + 1).toString().padStart(3, '0') + " - Custom",
                                    "offset": "0s",
                                    "ref": "r2",
                                    "duration": "600600/120000s",
                                    "start": "86486400/24000s"
                                },
                                "param": [
                                    {
                                        "_attr": {
                                            "name": "Position",
                                            "key": "9999/10199/10201/1/100/101",
                                            "value": "0 -8.75744e-12"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Alignment",
                                            "key": "9999/10199/10201/2/354/1002961760/401",
                                            "value": "1 (Center)"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Alignment",
                                            "key": "9999/10199/10201/2/373",
                                            "value": "0 (Left) 1 (Middle)"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Out Sequencing",
                                            "key": "9999/10199/10201/4/10233/201/202",
                                            "value": "0 (To)"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Baseline",
                                            "key": "9999/10199/10201/5/3001205390/6",
                                            "value": "-30"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Baseline",
                                            "key": "9999/10199/10201/5/3001205419/6",
                                            "value": "-30"
                                        }
                                    },
                                    {
                                        "_attr": {
                                            "name": "Baseline",
                                            "key": "9999/10199/10201/5/3001205543/6",
                                            "value": "-30"
                                        }
                                    }
                                ],
                                "text": [
                                    {
                                        "text-style": [
                                            {
                                                "_": "project ",
                                                "_attr": {
                                                    "ref": ("ts" + (i*2 + 1))
                                                }
                                            },
                                            {
                                                "_": (i + 1).toString().padStart(3, '0'),
                                                "_attr": {
                                                    "ref": ("ts" + (i*2 + 2))
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "text-style-def": [
                                    {
                                        "_attr": {
                                            "id": ("ts" + (i*2 + 1))
                                        },
                                        "text-style": [
                                            {
                                                "_attr": {
                                                    "font": "Avenir Next",
                                                    "fontSize": "120",
                                                    "fontFace": "Ultra Light",
                                                    "fontColor": "1 1 1 1",
                                                    "baseline": "-30",
                                                    "alignment": "center"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "_attr": {
                                            "id": ("ts" + (i*2 + 2))
                                        },
                                        "text-style": [
                                            {
                                                "_attr": {
                                                    "font": "Avenir Next",
                                                    "fontSize": "120",
                                                    "fontColor": "1 1 1 1",
                                                    "bold": "1",
                                                    "baseline": "-30",
                                                    "alignment": "center"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }

              ]
          }
      ]
  }
}
