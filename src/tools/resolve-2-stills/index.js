const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function secondsToHHMMSSFF(t) {
  // t is seconds (float), FF is frames (24fps)
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);
  const ff = Math.round((t - Math.floor(t)) * 24);
  return `${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}${String(s).padStart(2, '0')}${String(ff).padStart(2, '0')}`;
}

async function extractFirstFrame(folder) {
  const files = fs.readdirSync(folder).filter(f => f.toLowerCase().endsWith('.mov'));
  for (const file of files) {
    const fullPath = path.join(folder, file);
    // ffprobe to get first frame timestamp
    // Run ffprobe to get both frame timestamps and format tags (timecode)
    const ffprobe = spawnSync('ffprobe', [
      '-v', 'quiet',
      '-select_streams', 'v:0',
      '-show_entries', 'stream_tags=timecode',
      '-show_entries', 'format_tags=timecode',
      '-show_entries', 'frame=pkt_pts_time',
      '-show_frames',
      '-of', 'json',
      fullPath
    ], { encoding: 'utf8' });
    if (ffprobe.error) {
      console.error(`Error running ffprobe on ${file}:`, ffprobe.error);
      continue;
    }
    let ffprobeData = null;
    try {
      ffprobeData = JSON.parse(ffprobe.stdout);
    } catch (e) {
      console.error(`Could not parse ffprobe output for ${file}`);
      continue;
    }
    console.log(`ffprobe data for ${file}:`, JSON.stringify(ffprobeData, null, 2));
    // Try to use timecode from tags if available
    let tc_fmt = null;
    // 1. Check stream tags
    if (ffprobeData.streams && ffprobeData.streams.length > 0 && ffprobeData.streams[0].tags && ffprobeData.streams[0].tags.timecode) {
      tc_fmt = ffprobeData.streams[0].tags.timecode.replace(/[^0-9]/g, '');
    }
    // 2. Check format tags
    else if (ffprobeData.format && ffprobeData.format.tags && ffprobeData.format.tags.timecode) {
      tc_fmt = ffprobeData.format.tags.timecode.replace(/[^0-9]/g, '');
    }
    // 3. Fallback to frame timestamp
    else if (ffprobeData.frames && ffprobeData.frames.length > 0) {
      const frame = ffprobeData.frames[0];
      let timeVal = frame.pkt_pts_time || frame.pts_time || frame.pkt_dts_time || frame.best_effort_timestamp_time;
      if (timeVal) {
        tc_fmt = secondsToHHMMSSFF(parseFloat(timeVal));
      }
    }
    if (!tc_fmt) {
      console.error(`No usable timecode or frame timestamp found for ${file}`);
      continue;
    }

    // Extract YYYYMMDD from filename using regex
    const match = file.match(/(\d{8})/);
    if (!match) {
      console.error(`Could not extract date (YYYYMMDD) from filename: ${file}`);
      continue;
    }
    const yyyymmdd = match[1];
    let baseName = `ll_still_${yyyymmdd}_${tc_fmt}`;
    let version = 1;
    let outputJpg = path.join(folder, `${baseName}_v${version}.jpg`);
    while (fs.existsSync(outputJpg)) {
      version++;
      outputJpg = path.join(folder, `${baseName}_v${version}.jpg`);
    }
    // Log the intended new file name before extraction
    console.log(`Creating still: ${outputJpg}`);
    // ffmpeg to extract first frame
    const ffmpeg = spawnSync('ffmpeg', ['-y', '-i', fullPath, '-vframes', '1', outputJpg], { stdio: 'inherit' });
    if (ffmpeg.error) {
      console.error(`Error running ffmpeg on ${file}:`, ffmpeg.error);
      continue;
    }
    console.log(`Extracted: ${outputJpg}`);
  }
}

// If run directly, accept folder as argument
if (require.main === module) {
  const folder = process.argv[2];
  if (!folder) {
    console.error('Usage: node index.js <folder>');
    process.exit(1);
  }
  extractFirstFrame(folder);
}

module.exports = extractFirstFrame;
