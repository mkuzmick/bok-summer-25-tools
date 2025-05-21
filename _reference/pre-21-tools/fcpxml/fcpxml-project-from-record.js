
// project format hard-coded to r1

// record should have fields:
// Title, LastName, FirstName, CourseName


module.exports = function makeProject(record, i) {
  console.log(`making a project for ${record.fields.FirstName} ${record.fields.LastName}!`);
  var counter = (i + 1).toString().padStart(3, '0');
  return {
      "_attr": {
          "name": ("Project " + counter + ": " + record.fields.Title),
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
                                    "name": "project " + counter + " - Custom",
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
                                                "_": record.fields.FirstName ? record.fields.FirstName : "",
                                                "_attr": {
                                                    "ref": ("ts" + (i*2 + 1))
                                                }
                                            },
                                            {
                                                "_": record.fields.LastName ? record.fields.LastName : "",
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
