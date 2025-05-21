const airtableTools = require(`../../ll-modules/ll-airtable-tools`)
const { rawStill } = require('../../ll-modules/ll-object-factories')
const { llog } = require('../../ll-modules/ll-utilities')

function makeSlackImageURL (permalink, permalink_public) {
    let secrets = (permalink_public.split("slack-files.com/")[1]).split("-")
    let suffix = permalink.split("/")[(permalink.split("/").length - 1)]
    let filePath = `https://files.slack.com/files-pri/${secrets[0]}-${secrets[1]}/${suffix}?pub_secret=${secrets[2]}`
    return filePath
  }
  
const imageBot = async function ({ event, client, fileInfo }) {
    llog.yellow(`now starting image-bot`)
    try {
        if (fileInfo.file.public_url_shared !== true) {
          let publicResult = await client.files.sharedPublicURL({
              token: process.env.SLACK_USER_TOKEN,
              file: event.file_id,
          });
          console.log(`\nhere's the public result:\n\n${JSON.stringify(publicResult, null, 4)}`)  
          const rawStillRecord = await rawStill({dataType: `slackFileInfo`, data: publicResult})
          llog.blue(llog.divider, 'rawStillRecord', rawStillRecord)
          const mdPostResult = await client.chat.postMessage({
              channel: event.channel_id,
              thread_ts: publicResult.file.shares.public[event.channel_id][0].ts,
              text: `here's your markdown:\n\`\`\`![alt text](${makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)})\`\`\``,
              unfurl_media: false,
              unfurl_links: false,
              parse: "none"
          })

        // const airtableResult = await airtableTools.addRecord({
        //     baseId: process.env.AIRTABLE_PUMPKINS_BASE,
        //     table: "PublicImages",
        //     record: {
        //         "Name": fileInfo.file.title,
        //         "SlackEventJSON": JSON.stringify(event, null, 4),
        //         "SlackFileInfoJSON": JSON.stringify(fileInfo, null, 4),
        //         "ImageFiles": [
        //             {
        //             "url": makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)
        //             }
        //         ],
        //         "Status": "no-status",
        //         "SharedBySlackID": event.user_id,
        //         "SavedBySlackID": event.user_id  
        //     }
        // })
        } else {
          console.log(`file was already public: ${fileInfo.file.url_private} is what we'd handle`);
          const mdPostResult = await client.chat.postMessage({
              channel: event.user_id,
              text: `posted a photo! but it was already public: ${makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)}.\n\nhere's your markdown:\n\`\`\`![alt text](${makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)})\`\`\``
          })
        }
    }
    catch (error) {
        console.error(error);
        llog.red(error)
    }
}

module.exports = imageBot



