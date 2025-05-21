const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const Airtable = require('airtable');

// Supported file extensions
const videoRegex = /\.(mov|mp4|m4v|mts|mxf)$/i;
const audioRegex = /\.(aiff|mp3|aif|wav)$/i;
const stillRegex = /\.(cr2|jpg|jpeg)$/i;

// Function to get ffprobe data
async function getFfprobeData(videoFilePath) {
    console.log("Probing " + videoFilePath);
  
    try {
      const ffprobeData = JSON.parse(
        cp.spawnSync("ffprobe", [
          '-v', 'quiet',
          '-print_format', 'json',
          '-show_format', '-show_streams',
          videoFilePath
        ], { encoding: 'utf8' }).stdout
      );
      return ffprobeData;
    } catch (error) {
      console.error(`Error running ffprobe for ${videoFilePath}:`, error);
      return null;
    }
  }
  
// Function to find CaptureSession record by shootId
async function findCaptureSession(shootId, baseId, table) {
  console.log(`Searching for CaptureSession with ID: ${shootId}`);

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(baseId);

  try {
    const records = await base(table).select({
      maxRecords: 1,
      filterByFormula: `{CaptureID} = '${shootId}'`
    }).firstPage();

    if (records.length > 0) {
      console.log(`Found CaptureSession: ${records[0].id}`);
      return records[0].id;
    } else {
      console.error(`No CaptureSession found for ID: ${shootId}`);
      return null;
    }
  } catch (err) {
    console.error("Error finding CaptureSession: ", err);
    return null;
  }
}

// Function to send data to Airtable
async function sendToAirtable(record, baseId, table) {
  console.log("Sending this to Airtable: ", JSON.stringify(record, null, 4));

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(baseId);

  try {
    const airtableRecord = await base(table).create(record);
    console.log("Saved to Airtable: ", JSON.stringify(airtableRecord, null, 4));
    return airtableRecord;
  } catch (err) {
    console.error("There was an error sending to Airtable: ", err);
    return null;
  }
}

module.exports = async function processShootFolder(parentFolder) {
  const shootId = path.basename(parentFolder); // Extract shootId from folder name
  console.log(`Processing shoot folder: ${parentFolder} with shootId: ${shootId}`);

  const baseId = process.env.AIRTABLE_INGEST_BASE;
  const captureSessionTable = 'CaptureSessions';
  const captureFilesTable = 'CaptureFiles';

  // Find the linked CaptureSession record
  const captureSessionId = await findCaptureSession(shootId, baseId, captureSessionTable);

  if (!captureSessionId) {
    console.error(`Unable to proceed without a valid CaptureSession for shootId: ${shootId}`);
    return;
  }

  // Read all subfolders in the parent folder
  const subfolders = fs.readdirSync(parentFolder).filter((item) => {
    const itemPath = path.join(parentFolder, item);
    return fs.statSync(itemPath).isDirectory();
  });

  // Process each subfolder
  for (const folder of subfolders) {
    const cameraFolder = path.join(parentFolder, folder);
    console.log(`Processing camera folder: ${cameraFolder}`);

    // Get all files in the camera folder
    const files = fs.readdirSync(cameraFolder).filter((file) => {
      const filePath = path.join(cameraFolder, file);
      return (
        fs.statSync(filePath).isFile() &&
        !file.startsWith(".") && // Ignore hidden files like .DS_Store
        (videoRegex.test(file) || audioRegex.test(file) || stillRegex.test(file)) // Match valid extensions
      );
    });

    let counter = 1; // Initialize the counter for file numbering

    // Rename and process each file in the folder
    for (const file of files) {
      const ext = path.extname(file); // Get the file extension
      const newName = `${shootId}_${folder}.${String(counter).padStart(4, '0')}${ext}`;
      const oldPath = path.join(cameraFolder, file);
      const newPath = path.join(cameraFolder, newName);

      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldPath} -> ${newPath}`);

      // Get ffprobe data
      let ffprobeData = null;
      try {
        ffprobeData = await getFfprobeData(newPath);
      } catch (error) {
        console.error(`Failed to get ffprobe data for ${newPath}:`, error);
      }

      // Send data to Airtable
      try {
        await sendToAirtable(
          {
            FileName: newName,
            OriginalFilePath: oldPath,
            FfprobeJson: ffprobeData ? JSON.stringify(ffprobeData) : null,
            _CaptureSession: [captureSessionId]
          },
          baseId,
          captureFilesTable
        );
        console.log(`Sent data to Airtable for ${newName}`);
      } catch (error) {
        console.error(`Failed to send data to Airtable for ${newName}:`, error);
      }

      counter++; // Increment the counter
    }
  }

  console.log('Processing complete.');
};
