#!/usr/bin/env node
/**
 * add_timecode.js
 *
 * Usage:
 *   node add_timecode.js /path/to/your/video.mov
 *
 * This script:
 *   1. Gets the file creation time (birthtime) from the OS.
 *   2. Converts that time to a time-of-day timecode in "HH:MM:SS:FF" format
 *      using 24 frames per second (i.e. FF = floor(ms/1000 * 24)).
 *   3. Runs an ffmpeg command to add that timecode to the video.
 *
 * Note: The script assumes that ffmpeg is in your PATH.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

if (process.argv.length < 3) {
  console.error('Usage: node add_timecode.js /path/to/your/video.mov');
  process.exit(1);
}

const inputFile = process.argv[2];

// Get file statistics (using birthtime as the creation time)
fs.stat(inputFile, (err, stats) => {
  if (err) {
    console.error(`Error reading file stats: ${err.message}`);
    process.exit(1);
  }

  // Note: On some systems, birthtime may not be available.
  // This script assumes you are on a system (e.g. macOS) where it is.
  const created = stats.birthtime; // Date object

  // Format time-of-day as HH:MM:SS
  const hours = String(created.getHours()).padStart(2, '0');
  const minutes = String(created.getMinutes()).padStart(2, '0');
  const seconds = String(created.getSeconds()).padStart(2, '0');

  // Calculate frame number from the fractional second
  // (getMilliseconds() returns 0-999 ms; multiply by 24 fps and floor)
  const ms = created.getMilliseconds();
  const fractionalSeconds = ms / 1000;
  const frames = Math.floor(fractionalSeconds * 24);
  const framesStr = String(frames).padStart(2, '0');

  const timecode = `${hours}:${minutes}:${seconds}:${framesStr}`;
  console.log(`Calculated timecode: ${timecode}`);

  // Define the output file name (e.g. original file name with "_tc" appended)
  const dir = path.dirname(inputFile);
  const ext = path.extname(inputFile);
  const base = path.basename(inputFile, ext);
  const outputFile = path.join(dir, `${base}_tc${ext}`);

  // Construct the ffmpeg command.
  // The -timecode option sets the starting timecode metadata.
  // Here we use stream copy (-c copy) so that only the metadata is changed.
  const cmd = `ffmpeg -y -i "${inputFile}" -timecode "${timecode}" -c copy "${outputFile}"`;
  console.log(`Executing ffmpeg command:\n${cmd}\n`);

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Timecode ${timecode} added successfully to ${outputFile}`);
  } catch (e) {
    console.error('Error executing ffmpeg:', e);
    process.exit(1);
  }
});
