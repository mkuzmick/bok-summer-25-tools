var Airtable = require('airtable');
var s19 = require('../indexes/summer2019-tools');
var validator = require('validator');
const getSiteContent = require('../the-resources/get-site-content');
const resourceTemplate = require('../the-resources/resource-template');
const airtableTools = require('../the-resources/resource-airtable-tools');

module.exports = async function (req, res, next) {
  var base = new Airtable({
    apiKey: process.env.AIRTABLE_CODE_API_KEY
  }).base(process.env.AIRTABLE_RESOURCE_BASE);
  if (validator.isURL(req.body.text.trim())) {
    const siteContent = await getSiteContent(req.body.text.trim());
    const markdownString = await resourceTemplate(siteContent);
    console.log(`markdownString:\n\n${markdownString}`);
    var theRecord = {
      Name: "New Record",
      URL: req.body.text.trim()
    }
    var atRecordResponse = await airtableTools.addRecord({
      base: process.env.AIRTABLE_RESOURCE_BASE,
      table: 'NotQuitePinterestBut',
      record: {
          "name": siteContent.title.split(' ').slice(0,4).join('-').replace(/[^\w\s,\-]/gi, ''),
          "resourceId": siteContent.resourceId,
          // "tags": siteContent.keywords,
          "creatorId": process.env.MY_AUTHOR_ID ? process.env.MY_AUTHOR_ID : "",
          "ogDescription": siteContent.description,
          "ogTitle": siteContent.title,
          "ogImage": siteContent.previewImage,
          // "type": [
          //   "youtube"
          // ],
          "draftMarkdown": markdownString,
          "notes": "",
          // "TOOLS_AND_MEDIA": [
          //   "recHyFj7LsRmsGVQM",
          //   "recMWhgnjgsJC6Tk2"
          // ],
          "JSON": JSON.stringify(siteContent),
          "ogUrl": siteContent.url,
          "urlSubmitted": siteContent.originalUrl,
          // "creatorAtId": "",
          // "initialMarkdownFileUrl": filePath
      }
    });
    var slackMessage = {
      blocks: [
        s19.blx.divider(),
        s19.blx.section(`here's a link to your airtable record: ${process.env.AIRTABLE_NOTQUITE_VIEW_STEM}${atRecordResponse.id}\nand here's a link to the Resource page: https://resources.learninglab.xyz/nqp/${atRecordResponse.id}`, siteContent.previewImage)
      ]
    };
    res.json(slackMessage)
  } else {
    res.json({
      blocks: [
        s19.blx.section(`sorry, \`${req.body.text}\` doesn't look like a url.`),
        s19.blx.divider(),
        s19.blx.jsonString('req.body', req.body)
      ]
    })
  }

}
