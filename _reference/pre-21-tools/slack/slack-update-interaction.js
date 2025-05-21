module.exports = async function(req, res, next){
  console.log("got a slack event");
  console.log(JSON.stringify(req.body));
  res.send('got a slack request:' + req.body.text + ".\nHere's the full JSON.stringify:\n " + JSON.stringify(req.body, null, 4));
}
