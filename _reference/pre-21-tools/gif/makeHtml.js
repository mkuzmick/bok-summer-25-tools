const handlebars = require('handlebars');
const querystring = require('querystring');

var source = `
  <style>
    h1 {
      text-align: center;
      font-size: 100px;
      font-weight: 900;
      font-family: "Avenir Next";
      margin-bottom: 0px;
    }
    h2 {
      font-size: 20px;
      font-weight: 500;
      font-family: "Avenir Next"
    }
    .gif-wrap {
      margin:auto;
      width: 640px;
    }

    .img {
      display: block;
      margin: auto
    }
    .palette {
      width: 100%;
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: optimize-contrast;
      image-rendering: pixelated;
    }
  </style>
  <body>
    <div class="title">
      <h1>gifMachine</h1>
    </div>
    <div class="gif-wrap">
      <img class='gif' src='{{gif}}'></img>
      <h2>input</h2>
      <pre>{{input}}</pre>
      <h2>output</h2>
      <p>path to gif:</p>
      <a href={{gif}}><pre>{{gif}}</pre></a>
      <p>path to palette: = .</p>
      <pre>{{palette}}</pre>
      <img class='palette' src='{{palette}}'></img>
      <p>Delete them if you wish, but then this page won't work.</p>
    </div>
  </body>
`

var template = handlebars.compile(source);

function makeHtml(gif, palette, input){
  var result = template({
    gif: gif,
    palette: palette,
    input: input
  });
  return result
}

module.exports = makeHtml;
