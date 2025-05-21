var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');

aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
})

module.exports = async function(filePath){
  const S3_BUCKET = process.env.S3_THESHOW_BUCKET;
  const s3 = new aws.S3();  // Create a new instance of S3
  const stream = fs.createReadStream(filePath);
  var params = {
    Bucket: S3_BUCKET,
    Key: path.join('public', 'uploads', path.basename(filePath)),
    Body: stream
  };
  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("uploaded your file to " + data.Location);
    }
  });
}
