var moment = require('moment');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

module.exports = function(yargs){
  console.log("launching new tool notes");
  var timestamp = moment();
  var initialText = `
# NEW TOOL NOTE
started ${timestamp.format('YYYYMMDD [at] h:mm:ss.SSS a')} = ${timestamp.valueOf()}.

## OUTLINE
list of elements:
- one
- two

## CODE SNIPPETS
\`var fs = require('fs');\`

## IMAGES
![alt text](https://live.staticflickr.com/4714/39330758854_a8e831dc23_h.jpg "MK Studio Tests")

`
  var filepath = path.join(ROOT_DIR, 'documentation', 'drafts', `new-tool-${timestamp.format('YYYYMMDD-HHmmss.SSS')}.md`)
  fs.writeFileSync(filepath, initialText);
  cp.spawnSync('open', [filepath, '-a', `FoldingText`]);
  cp.spawnSync('open', [filepath, '-a', `Marked 2`]);
  cp.spawnSync('open', [filepath, '-a', `Atom`]);
  console.log("done?");
}
