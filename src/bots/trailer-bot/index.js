const llog = require("learninglab-log");
const OpenAI = require("openai");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { App } = require("@slack/bolt");
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs-extra');
const FormData = require('form-data');
const axios = require('axios');

const getDuration = (filePath) => {
    return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);
        const duration = metadata.format.duration;
        resolve(duration);
    });
    });
};

const trailerBot = async ({ inputFile }) => {
    llog.green("trailerBot starting up");
    if (!ffmpegPath) {
      console.error('Error: ffmpeg is not installed or not accessible.');
      return;
    }
  
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY is not set. Please set it in your environment.');
      return;
    }
  
    const allowedExtensions = ['m4a', 'mp4', 'm4v', 'mov', 'mp3', 'aiff', 'wav'];
    const maxFileSize = 20 * 1024 * 1024; // 20MB instead of 25MB
  
    try {
      const fileExtension = path.extname(inputFile).slice(1).toLowerCase();
      const outputDir = path.dirname(inputFile);  // Get the directory of the input file
      const fileNameWithoutExt = path.basename(inputFile, path.extname(inputFile));
      const outputFile = path.join(outputDir, `${fileNameWithoutExt}.json`);
  
      if (!fs.existsSync(inputFile)) {
        console.error(`Error: File '${inputFile}' not found!`);
        return;
      }
  
      if (!allowedExtensions.includes(fileExtension)) {
        console.error(`Error: File extension '${fileExtension}' is not supported!`);
        console.error(`Supported extensions: ${allowedExtensions.join(', ')}`);
        return;
      }
  
      let fileToProcess = inputFile;
      
      // If not m4a, convert it to AAC (m4a)
      if (fileExtension !== 'm4a') {
        const convertedFile = await convertToM4a(inputFile);
        fileToProcess = convertedFile;
      }
  
      const fileSize = (await fs.stat(fileToProcess)).size;
  
      if (fileSize > maxFileSize) {
        console.log('File is larger than 25 MB, splitting into smaller chunks...');
        await splitAndProcessChunks(fileToProcess, outputFile, maxFileSize);
      } else {
        await transcribeFile(fileToProcess, outputFile);
      }
  
      console.log(`Transcription saved to ${outputFile}`);
    } catch (error) {
      console.error(`Error processing video: ${error.message}`);
    }
  };
  

async function convertToM4a(inputFile, outputFile) {
    const outputDir = path.dirname(inputFile);  // Get the directory of the input file
    const fileNameWithoutExt = path.basename(inputFile, path.extname(inputFile));
    const m4aFile = path.join(outputDir, `${fileNameWithoutExt}.m4a`);
  
    return new Promise((resolve, reject) => {
      ffmpeg(inputFile)
        .setFfmpegPath(ffmpegPath)
        .output(m4aFile)  // Ensure the m4a is saved in the same directory
        .audioCodec('aac')
        .audioBitrate('128k')
        .noVideo()
        .on('end', () => {
          console.log(`Converted ${inputFile} to ${m4aFile}`);
          resolve(m4aFile);  // Resolve with the path to the new m4a file
        })
        .on('error', reject)
        .run();
    });
  }
  


async function splitAndProcessChunks(inputFile, outputFile, maxFileSize) {
    const duration = await getVideoDuration(inputFile);
    const chunkTime = Math.ceil(duration * maxFileSize / (await fs.stat(inputFile)).size);
    const outputDir = path.dirname(inputFile);  
    return new Promise((resolve, reject) => {
        const chunkPattern = path.join(outputDir, `${path.basename(inputFile, path.extname(inputFile))}_part_%03d.m4a`);
        ffmpeg(inputFile)
            .setFfmpegPath(ffmpegPath)
            .outputOptions([`-f segment`, `-segment_time ${chunkTime}`, '-c copy'])
            .output(chunkPattern)
            .on('end', async () => {
                try {
                    // List all files in the directory
                    const chunks = await fs.readdir(outputDir);
                    
                    // Filter for chunk files
                    const chunkFiles = chunks.filter(file => file.startsWith(`${path.basename(inputFile, path.extname(inputFile))}_part_`) && file.endsWith('.m4a'));
                    
                    console.log('Chunk files:', chunkFiles);  // Log the found chunk files

                    const jsonResponses = [];
                    for (const chunk of chunkFiles) {
                        const chunkFilePath = path.join(outputDir, chunk);
                        const chunkOutputFile = `${chunkFilePath}.json`;  // Save JSON in the same directory

                        // Ensure the chunk exists before processing it
                        if (fs.existsSync(chunkFilePath)) {
                            await transcribeFile(chunkFilePath, chunkOutputFile);
                            const chunkJson = await fs.readJson(chunkOutputFile);
                            jsonResponses.push(chunkJson);
                        } else {
                            console.error(`Chunk file ${chunkFilePath} does not exist.`);
                        }
                    }

                    // Combine all chunk responses into one JSON file
                    await fs.writeJson(outputFile, jsonResponses);
                    resolve();
                } catch (error) {
                    console.error(`Error while processing chunks: ${error.message}`);
                    reject(error);
                }
            })
            .on('error', reject)
            .run();
    });
}




async function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    ffmpeg(file)
      .ffprobe((err, data) => {
        if (err) reject(err);
        const duration = data.format.duration;
        resolve(duration);
      });
  });
}

async function transcribeFile(file, outputFile) {
    const form = new FormData();
    form.append('file', fs.createReadStream(file));
    form.append('model', 'whisper-1');
    form.append('response_format', 'verbose_json');
    form.append('timestamp_granularities[]', 'word');
  
    try {
      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders(),
        },
      });
  
      // Save the transcription as pretty-printed JSON in the same directory as the chunk file
      await fs.writeJson(outputFile, response.data, { spaces: 2 });  // Pretty-print with 2 spaces
      console.log(`Transcription with timestamps for ${file} saved to ${outputFile}`);
    } catch (error) {
      console.error(`Error in API request for file ${file}: ${error.message}`);
    }
  }
  




module.exports = trailerBot;
