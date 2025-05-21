// Required modules for file watching, image processing, and Slack integration
const chokidar = require('chokidar');
const makeBlackAndWhite = require('./make-black-and-white');
const tgaToPng = require('./tga-to-png');
const { WebClient } = require('@slack/web-api');
const { createReadStream } = require('fs');
const { spawnSync } = require('child_process');

/**
 * Handle the results of a spawnSync command execution.
 * Logs errors, standard errors, or a success message.
 *
 * @param {Object} result - The result object from spawnSync.
 * @param {string} processName - The name of the executed command for logging purposes.
 */
const handleSpawnSyncError = (result, processName) => {
    if (result.error) {
        console.error(`${processName} error:`, result.error);
    } else if (result.stderr && result.stderr.toString()) {
        console.error(`${processName} stderr:`, result.stderr.toString());
    } else {
        console.log(`${processName} completed successfully.`);
    }
};

/**
 * Watches a folder for new images, processes the images, and sends them to Slack.
 * Also adds borders to images and sends them to print.
 *
 * @param {string} folder - The path to the folder that will be watched for new images.
 */
const imageWatcher = async (folder) => {
    // Create a new instance of WebClient for Slack communication
    const slackClient = new WebClient(process.env.SLACK_USER_TOKEN);

    // Set up file watcher for the given folder, ignoring .DS_Store files
    const watcher = chokidar.watch(folder, {
        ignored: /\.DS_Store/,
        persistent: true,
        awaitWriteFinish: true
    });

    // Event handler for when a new file is added to the folder
    watcher.on('add', async path => {
        console.log('File', path, 'has been added');

        // Check if the file is not already a processed image
        if (!/-bw/.test(path) && !/-clr/.test(path)) {
            try {
                // Convert image format from TGA to PNG
                const png = await tgaToPng(path);
                // Convert the PNG image to black and white
                const bwPath = await makeBlackAndWhite(png);

                // Upload the processed image to Slack
                const uploadResult = await slackClient.files.upload({
                    file: createReadStream(bwPath),
                    initial_comment: `new photo ${bwPath}`,
                    channels: process.env.SLACK_IMG2MD_CHANNEL,
                    title: "new still posted"
                });

                console.log('Image uploaded to Slack:', JSON.stringify(uploadResult));

                // Add borders to the image
                const marginPath = `${bwPath}-with-margins.png`;
                let result = spawnSync('convert', [bwPath, '-bordercolor', 'white', '-border', '720x720', marginPath]);

                handleSpawnSyncError(result, 'ImageMagick');

                // Print the image with margins if there were no errors with ImageMagick
                if (!result.error && (!result.stderr || !result.stderr.toString())) {
                    result = spawnSync('lp', [marginPath, '-o', 'media=Letter', '-o', 'InputSlot=Tray1']);
                    handleSpawnSyncError(result, 'lp');
                }

            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            console.log(`This is already a processed image: ${path}`);
        }
    });

    // Additional watchers for other events
    watcher
        .on('change', path => console.log('File', path, 'has been changed'))
        .on('unlink', path => console.log('File', path, 'has been removed'))
        .on('error', error => console.error('Error happened', error));
};

// Export the imageWatcher function for use in other modules
module.exports = imageWatcher;
