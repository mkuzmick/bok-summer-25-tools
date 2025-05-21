var React = require('react');
var ReactDOMServer = require('react-dom/server');

module.exports = function(settings){
  var SimpleComponent = `<p>hello</p>`
  var result = ReactDOMServer.renderToString(SimpleComponent)
  return result;
}
