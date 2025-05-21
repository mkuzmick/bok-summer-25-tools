const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({attrkey: "_attr"})
const builder = new xml2js.Builder({attrkey: "_attr"})
const argv = require('minimist')(process.argv.slice(2))

function io2s(segmentArray, mcXmlPath, title){
  var theDate = new Date
  var offset = 0
  var theIoClips = []
  var theSpineArray = [{"mc-clip": theIoClips}]
  var xmlData = fs.readFileSync(mcXmlPath, "utf-8");

  parser.parseString(xmlData, (err, data) => {

    var sourceJsonPath = mcXmlPath.split('.')[0] + '_' + theDate.getTime() + '_' + title + '_sourceXml.json'
    fs.writeFileSync(sourceJsonPath, (JSON.stringify(data, null, 4)))

    theMulticlips = []
    segmentArray.forEach((segment)=>{
      var theMcName = (segment.shootId.split("_MC_")[0] + "_MC");
      if (!theMulticlips.includes(theMcName)) {
        theMulticlips.push(theMcName)
      }
    });
    console.log("the multiclips referenced are " + JSON.stringify(theMulticlips, null, 4));

    var mcArray = [];
    theMulticlips.forEach(mc => {
      console.log("working on " + mc);
      for (var i = 0; i < data.fcpxml.resources[0].media.length; i++) {
        console.log("getting this from data.fcpxml.resources . . . " + data.fcpxml.resources[0].media[i]._attr.name);
        if (mc == data.fcpxml.resources[0].media[i]._attr.name) {
          mcArray.push({name: mc, rNumber: data.fcpxml.resources[0].media[i]._attr.id});
          console.log("pushing in " + mc + " and " + data.fcpxml.resources[0].media[i]._attr.id);
          break;
        }
      }
    })
    console.log(JSON.stringify(mcArray, null, 4))

    var shootIdRe = /([0-9]{8}_[0-9]{3})/
    segmentArray.forEach((segment, index) => {
        if (shootIdRe.test(segment.shootId)) {
          console.log(`segment ${index} ------------------`)
          console.log(JSON.stringify(segment, null, 4))

          var thisFile = (segment.shootId.split("_MC_")[0] + "_MC")
          for (var i = 0; i < mcArray.length; i++) {
            if (mcArray[i].name == thisFile) {
              var theR = mcArray[i].rNumber;
              console.log(`here is theR: ${theR}`);
              break;
            }
          }

          //handle any leading 0s converted to strings by CSVtoJSON
          if (typeof segment.inFrame === 'string'){
            segment.inFrame = parseInt(segment.inFrame, 10)
          }
          if (typeof segment.inSec === 'string'){
            segment.inSec = parseInt(segment.inSec, 10)
          }
          if (typeof segment.inMin === 'string'){
            segment.inMin = parseInt(segment.inMin, 10)
          }
          if (typeof segment.inHr === 'string'){
            segment.inHr = parseInt(segment.inHr, 10)
          }
          if (typeof segment.outFrame === 'string'){
            segment.outFrame = parseInt(segment.outFrame, 10)
          }
          if (typeof segment.outSec === 'string'){
            segment.outSec = parseInt(segment.outSec, 10)
          }
          if (typeof segment.outMin === 'string'){
            segment.outMin = parseInt(segment.outMin, 10)
          }
          if (typeof segment.outHr === 'string'){
            segment.outHr = parseInt(segment.outHr, 10)
          }


          var inTcFcpxml = 1001*((segment.inFrame)+(24*(segment.inSec+(60*(segment.inMin+(60*segment.inHr))))));
          console.log("inTcFcpxml is " + inTcFcpxml);
          var outTcFcpxml = 1001*((segment.outFrame)+(24*(segment.outSec+(60*(segment.outMin+(60*segment.outHr))))));
          console.log("outTcFcpxml is " + outTcFcpxml);
          var duration = (outTcFcpxml - inTcFcpxml)+1001;
          console.log("duration is " + duration);

          var camera = ""
          var audioAngleID = ""
          if (!segment.camAngle || segment.camAngle=="A") {
            for (var j = 0; j < data.fcpxml.resources[0].media.length; j++) {
              if (data.fcpxml.resources[0].media[j]._attr.id == theR) {
                for (var i = 0; i < data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"].length; i++) {
                  if ('a' == data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.name.substr(-1)) {
                      camera = data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.angleID
                      audioAngleID = data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.angleID
                  }
                }
              }
            }

          }
          else if (segment.camAngle=="C") {
            for (var j = 0; j < data.fcpxml.resources[0].media.length; j++) {
              if (data.fcpxml.resources[0].media[j]._attr.id == theR) {
                for (var i = 0; i < data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"].length; i++) {
                  if ('b' == data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.name.substr(-1)) {
                      camera = data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.angleID
                  }
                }
              }
            }
          }
          else if (segment.camAngle=="B") {
            for (var j = 0; j < data.fcpxml.resources[0].media.length; j++) {
              if (data.fcpxml.resources[0].media[j]._attr.id == theR) {
                for (var i = 0; i < data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"].length; i++) {
                  if ("GH4" == data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.name.substr(-3)) {
                      camera = data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.angleID
                  }
                }
              }
            }


          }

          if (!audioAngleID) {
            for (var j = 0; j < data.fcpxml.resources[0].media.length; j++) {
              if (data.fcpxml.resources[0].media[j]._attr.id == theR) {
                for (var i = 0; i < data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"].length; i++) {
                  if ('a' == data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.name.substr(-1)) {
                      audioAngleID = data.fcpxml.resources[0].media[j].multicam[0]["mc-angle"][i]._attr.angleID
                  }
                }
              }
            }
          }

          var thisClipXML = {_attr:{
                                name: thisFile,
                                offset:fcpxmlFormat(offset),
                                ref:theR,
                                duration:fcpxmlFormat(duration),
                                start:fcpxmlFormat(inTcFcpxml)
                              },
                            "mc-source":[
                                {_attr:{
                                  angleID: audioAngleID,
                                  srcEnable:"audio"}
                                },
                                {_attr:{
                                  angleID: camera,
                                  srcEnable:"video"}
                                }
                              ]
                            };

        }
        // TODO: decide whether to include gaps
        // else if (!shootIdRe.test(segment.shootId)) {
        //   var duration = 72072;
        //   console.log(index);
        //   console.log("tried negative test and this isn't a match " + segment.shootId);
        //   var thisClipXML = {"gap": //do something here? not formatted properly for builder
        //       [
        //         {_attr:
        //           {name: "Gap", offset:fcpxmlFormat(offset), duration:fcpxmlFormat(duration), start:"86400314/24000s"}
        //         }
        //
        //       ]
        //     };
        //
        // }

        theIoClips.push(thisClipXML);
        offset = offset + duration;
      })


      console.log("the final offset is " + offset)
      var segmentDuration = tc_from_frames((offset/1001)).tc_string
      console.log("the segment is " + segmentDuration + " long.")

      var theEventObject = {_attr:
                              {name: "Projects"},
                            project:[
                              {
                                _attr: {name: title},
                                sequence:
                                [{
                                  _attr: {duration: fcpxmlFormat(offset), format: data.fcpxml.resources[0].format[0]._attr.id, tcStart:"0s", tcFormat:"0s", tcFormat: "NDF", audioLayout:"stereo", audioRate:"48k"},
                                  spine: theSpineArray

                                }]
                                }
                              ]
                            }

      data.fcpxml.library[0].event.push(theEventObject)

      var xmlForExport = builder.buildObject(data)
      var pathForLibrary = (mcXmlPath.split('.')[0] + '_' + theDate.getTime() + '_' + title + '_io2s.fcpxml')
      fs.writeFileSync(pathForLibrary, xmlForExport)

      var newJsonPath = mcXmlPath.split('.')[0] + '_' + theDate.getTime() + '_' + title + '_io2s.json'
      fs.writeFileSync(newJsonPath, JSON.stringify(data, null, 4))

      var eventXmlObject = {event:theEventObject};
      var eventXml = builder.buildObject(eventXmlObject);
      var pathForEvent = (mcXmlPath.split('.')[0] + '_' + theDate.getTime() + '_' + title + '_eventOnly.fcpxml')
      fs.writeFileSync(pathForEvent, eventXml);

      console.log("done");

  })
}



function fcpxmlFormat(number){
  return (number + "/24000s");
}



function tc_from_frames(frames){
  var the_frames=(frames % 24);
  var seconds = (frames-the_frames)/24;
  var the_seconds=(seconds%60);
  var minutes = (seconds-the_seconds)/60;
  var the_minutes = minutes%60;
  var the_hours = (minutes-the_minutes)/60;
  var theTc_string = ((("00" + the_hours).slice(-2))+(("00" + the_minutes).slice(-2))+(("00" + the_seconds).slice(-2))+(("00" + the_frames).slice(-2)));
  var theTc_colon_string = ((("00" + the_hours).slice(-2))+ ":" + (("00" + the_minutes).slice(-2))+ ":" + (("00" + the_seconds).slice(-2))+ ":" + (("00" + the_frames).slice(-2)));
  return {tc_forFilename: theTc_string, tc_string:theTc_colon_string};
};



var theJson = require(argv.json)
console.log("starting io2s.......\n\n\n")
io2s(theJson, argv.xml, argv.title)
