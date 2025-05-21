const moment = require('moment');
const placeholderImage = 'https://live.staticflickr.com/2871/33129125296_1ef184d0c9_h.jpg';

module.exports = function(data){
  if (!data.previewImage) {
    data.previewImage = placeholderImage
  }
  if (!(data.title)) {
    console.log("the resource template requires .title argument");
    return `<h1>sorry, no data</h1>` ;
  } else {
    var templateText = `---
title: "${escapeDoubleQuotes(data.title)}"
description: "${escapeDoubleQuotes(data.description)}"
thumbnail: "${data.previewImage}"
author: "insert name"
id: "${data.resourceId}"
---
# ${data.title}
Resource pulled from [${data.title}](${data.url}).
${data.timestamp}

${ data.embedCode ? data.embedCode
  : `![${data.title}](${data.previewImage})`
}

## DESCRIPTION
${data.description ? data.description : ""}

## KEYWORDS
${data.videoTags ? `\n${data.videoTags.join(", ")}` :  data.keywords}

`
    if (data.images.length > 0) {
      templateText+=`\n\n## IMAGE OPTIONS\n\nWe'll embed the first three but then just link to the rest.\n\n`
      for (var i = 0; i < data.images.length; i++) {
        if (i<3) {
          templateText+=`image ${i+1}\n\n![${data.images[i].alt}](${data.images[i].url})\n\n`
        } else {
          templateText+=`[extra image ${i + 1}](${data.images[i].url}). `
        }

      }
    }

    if (process.env.SHOW_SCRAPED_DATA=="TRUE") {
      templateText+=`
## SCRAPED CONTENT
\`\`\`
${JSON.stringify(data, null, 4)}
\`\`\`
`
    }

    return templateText;
  }
}


function escapeDoubleQuotes(str) {
	return str.replace(/\\([\s\S])|(")/g,"\\$1$2");
}
