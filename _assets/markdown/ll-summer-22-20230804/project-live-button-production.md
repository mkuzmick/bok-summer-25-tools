---
tags: mk, projects
---


# project-live-button-production

### workflow for Thursday happy hour

- set up shoot
    - green or white background in the brick room
    - one camera for close ups
        - optional: one for full body shot
- prep materials
    - button supplies
    - neon paper







### workflow options

- capture images
    - screenshots of OBS with macOS screenshot tool
    - screenshots of OBS from OBS
    - capture to short video clips in hyperdeck
    - capture to long video clips in hyperdeck
- queue images to be processed
    - send macOS screenshots to folder with `defaults write`
    - send OBS screen captures to folder from within OBS preferences
    - pull stills from hyperdeck video
        - copy video over directly from rotating cards
        - pull video over ftp from shorter clips
        - use SD card duplicator?
- process images
    - in lightroom manually
    - with photoshop actions
    - using imagemagick on watch folder
    - using ffmpeg on watch folder
- print images
    - from lightroom
    - using #show-your-work to Airtable to Page Designer to Printer workflow
    - from InDesign using InDesign script


### script concepts

- one
    - screenshot
    - apply ffmpeg filters
    - upload to Slack (#show-your-work)
    - print from Airtable
- another
    - screenshot
    - apply magick filters
    - print from command line
    - send to Slack/Airtable for backup


### scripting notes

[on curves in ffmpeg](https://video.stackexchange.com/questions/14603/what-is-the-ffmpeg-filter-equivalent-of-automatic-levels-for-colors).
[on imagemagick normalize](https://imagemagick.org/script/command-line-options.php#normalize)

basic thing we were doing

`ffmpeg -i /Users/mk/Desktop/mk-1.jpg -vf "eq=contrast=2:brightness=0.35:saturation=0" /Users/mk/Desktop/mk-1-ffmpeg-test-5.png`

### plan for Thursday

Set up screenshots folder with
 
```
mkdir ~/Desktop/screenshots-for-buttons
defaults write com.apple.screencapture location ~/Desktop/screenshots-for-buttons
```

then let's watch this folder with [chokidar](https://www.npmjs.com/package/chokidar), making sure that we wait for file copy jobs to complete

```
var chokidar = require('chokidar');

var watcher = chokidar.watch(thePathToFolder, {ignored: /^\./, persistent: true, awaitWriteFinish: true});

watcher
  .on('add', function(path) {console.log('File', path, 'has been added');})
  .on('change', function(path) {console.log('File', path, 'has been changed');})
  .on('unlink', function(path) {console.log('File', path, 'has been removed');})
  .on('error', function(error) {console.error('Error happened', error);})
```


from the docs
```
  
  
const
// awaitWriteFinish: true


// Example of a more typical implementation structure

// Initialize watcher.
const watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));

// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });

// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: https://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});

// Watch new files.
watcher.add('new-file');
watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);

// Get list of actual paths being watched on the filesystem
var watchedPaths = watcher.getWatched();

// Un-watch some files.
await watcher.unwatch('new-file*');

// Stop watching.
// The method is async!
watcher.close().then(() => console.log('closed'));

// Full list of options. See below for descriptions.
// Do not use this example!
chokidar.watch('file', {
  persistent: true,

  ignored: '*.txt',
  ignoreInitial: false,
  followSymlinks: true,
  cwd: '.',
  disableGlobbing: false,

  usePolling: false,
  interval: 100,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },

  ignorePermissionErrors: false,
  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});


```

then when new images show up, let's convert them to black and white in the `b-and-w` folder, then move the originals out of the watch folder to a "completed" folder.

```

```

let's log all jobs to a growing md file.