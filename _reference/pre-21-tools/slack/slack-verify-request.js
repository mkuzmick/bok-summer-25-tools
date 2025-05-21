const qs = require('qs');
const crypto = require('crypto');
// const testUserId = process.env.MK_SLACK_ID;
// var authorizedUsers = process.env.AUTHORIZED_USERS.split(",");

module.exports = function(req, res, next){
  var slackSignature = req.headers['x-slack-signature'];
  var requestBody = qs.stringify(req.body,{ format:'RFC1738' });
  // console.log(requestBody);
  var timestamp = req.headers['x-slack-request-timestamp'];
  // console.log("got a summer2019 app request and will verify it");
  // console.log(JSON.stringify(req.body, null, 4));
  // console.log("headers");
  // console.log(JSON.stringify(req.headers, null, 4));
  const time = Math.floor(new Date().getTime()/1000);
  if (Math.abs(time - timestamp) > 300) {
    // console.log("request with wrong time");
    // console.log(Math.abs(time - timestamp) + " is the differential");
    return res.status(400).send('Ignore this request.');
  } else {
    // console.log("sent at a valid time: " + Math.abs(time - timestamp) );
    var sigBasestring = 'v0:' + timestamp + ':' + requestBody;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    var mySignature = 'v0=' +
                     crypto.createHmac('sha256', slackSigningSecret)
                           .update(sigBasestring, 'utf8')
                           .digest('hex');
    // console.log("going to test sigBasestring: " + sigBasestring);
    // console.log("mySignature: " + mySignature);
    // console.log("slackSignature: " + slackSignature);
    if (crypto.timingSafeEqual(
      Buffer.from(mySignature, 'utf8'),
      Buffer.from(slackSignature, 'utf8'))) {
        console.log("timingSafeEqual true");
        req.timingSafeEqual=true;
        console.log("sending you back to next function");
        next();
      } else {
        console.log("the timingSafeEqual failed");
        return res.status(400).send('Verification failed');
      }
  }
}
