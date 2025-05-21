
var request = require("request");

module.exports = async function (url){

  request({
      url: filePrivateUrl,
      headers: {
        'Authorization': 'Bearer ' + YOUR_TOKEN // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      }
    }).pipe(fs.createWriteStream('./thefile'));

}


// from https://stackoverflow.com/questions/37336050/pipe-a-stream-to-s3-upload
async function uploadReadableStream(stream) {
  const params = {Bucket: bucket, Key: key, Body: stream};
  return s3.upload(params).promise();
}

async function upload() {
  const readable = getSomeReadableStream();
  const results = await uploadReadableStream(readable);
  console.log('upload complete', results);
}
