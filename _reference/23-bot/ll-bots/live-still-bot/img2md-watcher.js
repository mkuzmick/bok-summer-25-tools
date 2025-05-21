var chokidar = require('chokidar');
const makeBlackAndWhite = require('./make-black-and-white');
const tgaToPng = require('./tga-to-png');
const { WebClient } = require('@slack/web-api'); // Import WebClient class
const fs = require('fs')
const { spawnSync } = require('child_process');  // Import spawnSync


const imageWatcher = async (folder) => {
    // Create a new instance of WebClient with your Slack API token
    const slackClient = new WebClient(process.env.SLACK_USER_TOKEN);

    var watcher = chokidar.watch(folder, { ignored: /\.DS_Store/, persistent: true, awaitWriteFinish: true });
    watcher
        .on('add', async function(path) {
            console.log('File', path, 'has been added');
            if (!/-bw/.test(path) && !/-clr/.test(path)) {
                let png = await tgaToPng(path);
                let bwPath = await makeBlackAndWhite(png);

                const uploadResult = await slackClient.files.upload({
                    file: fs.createReadStream(`${bwPath}`),
                    initial_comment: ("new photo " + bwPath),
                    channels: process.env.SLACK_IMG2MD_CHANNEL,
                    title: "new still posted"
                });

                console.log('Image uploaded to Slack:', JSON.stringify(uploadResult));

                const marginPath = `${bwPath}-with-margins.png`;
                let result = spawnSync('convert', [bwPath, '-bordercolor', 'white', '-border', '720x720', marginPath]);

                if (result.error) {
                    console.error('ImageMagick error:', result.error);
                } else if (result.stderr && result.stderr.toString()) {
                    console.error('ImageMagick stderr:', result.stderr.toString());
                } else {
                    // Print the image with margins
                    result = spawnSync('lp', [marginPath, '-o', 'media=Letter', '-o', 'InputSlot=Tray1']);

                    if (result.error) {
                        console.error('lp error:', result.error);
                    } else if (result.stderr && result.stderr.toString()) {
                        console.error('lp stderr:', result.stderr.toString());
                    } else {
                        console.log('Image with margins printed.');
                    }
                }
                
            } else {
                console.log(`This is already a processed image: ${path}`);
            }

        })
        .on('change', function(path) {
            console.log('File', path, 'has been changed');
        })
        .on('unlink', function(path) {
            console.log('File', path, 'has been removed');
        })
        .on('error', function(error) {
            console.error('Error happened', error);
        });
};

module.exports = imageWatcher;
