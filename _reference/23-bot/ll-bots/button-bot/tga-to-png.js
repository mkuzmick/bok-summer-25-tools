var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var imageRegex = /(jpg|png|jpeg|tiff|tga)/i;
// var ffprobeToJson = require('./ffprobe-to-json');
const { cyan, blue, yellow, magenta, gray, white, divider } = require(`../utilities/mk-utilities`);
var intervalToDuration = require('date-fns/intervalToDuration')
var format = require('date-fns/format')



const tgaToPng = async function (file) {
    console.log(``)
    if (imageRegex.test(file)) {
        magenta(`creating png from ${file}`)
        const clrPath = path.join(path.dirname(file), `${path.basename(file, path.extname(file))}-clr.png`)
        blue(clrPath)
        await cp.spawnSync('ffmpeg', [
            '-i', file,
            `-vf`, `eq=contrast=1:brightness=0:saturation=1`,
            clrPath
          ], {
            stdio: [
              0, // Use parent's stdin for child
              'pipe', // Pipe child's stdout to parent
              2 // Direct child's stderr to a file
            ]
          });
        blue(`done creating ${clrPath}`)
        
    } else {
        gray(`${file} is not an image`)
    }   
}

// ffmpeg -i /Users/mk/Desktop/mk-1.jpg -vf "eq=contrast=2:brightness=0.3:saturation=0" /Users/mk/Desktop/mk-1-ffmpeg-test-5.jpg


module.exports = tgaToPng;

