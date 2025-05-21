const path = require('path');

module.exports = async function (clips) {
  var counts = {};
  var exts = [];
  for (var i = 0; i < clips.length; i++) {
    if (exts.includes(path.extname(clips[i].newPath))) {
      console.log("already got the ext for " + clips[i].newPath);
      counts[path.extname(clips[i].newPath)]++
    } else {
      exts.push(path.extname(clips[i].newPath));
      counts[path.extname(clips[i].newPath)]=1
    }
  }
  console.log("all done");
  console.log("counts are");
  console.log(JSON.stringify(exts, null, 4));
  console.log(JSON.stringify(counts, null, 4));
  var theExtCount = 0;
  var theExt = "";
  for (var i = 0; i < exts.length; i++) {
    if (counts[exts[i]] > theExtCount) {
      var theExtCount = counts[exts[i]];
      var theExt = exts[i];
      console.log("set theExtCount to " + theExtCount
        + " and set theExt to " + theExt);
    }
  }

  console.log("the ext with the largest count is " + theExt + " (" + theExtCount + ")");
  console.log(JSON.stringify(Object.keys(counts), null, 4));

  var notTheRightExt;
}
