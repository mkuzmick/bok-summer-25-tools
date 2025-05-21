module.exports = function (req, res, next){
  res.json({
    message: "going to build something here",
    body: req.body,
    params: req.params
  })
}
