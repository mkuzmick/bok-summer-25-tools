const airtableTools = require(`../utilities/airtable-tools`)

function makeSlackImageURL (permalink, permalink_public) {
    let secrets = (permalink_public.split("slack-files.com/")[1]).split("-")
    let suffix = permalink.split("/")[(permalink.split("/").length - 1)]
    let filePath = `https://files.slack.com/files-pri/${secrets[0]}-${secrets[1]}/${suffix}?pub_secret=${secrets[2]}`
    return filePath
  }
  
const externalLinkListener = async function (event, client, fileInfo) {
    try {
        if (fileInfo.file.public_url_shared !== true) {
        const publicResult = await client.files.sharedPublicURL({
            token: process.env.SLACK_USER_TOKEN,
            file: event.file_id,
        });
        console.log(`\nhere's the public result:\n\n${JSON.stringify(publicResult, null, 4)}`)  
        const mdPostResult = await client.chat.postMessage({
            channel: event.user_id,
            text: `posted a photo! but it was already public: ${makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)}.\n\nhere's your markdown:\n\`\`\`![alt text](${makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)})\`\`\``
        })
        const airtableResult = await airtableTools.addRecord({
            baseId: process.env.AIRTABLE_STUDIO_BOT_BASE,
            table: "PublicImages",
            record: {
                "Name": fileInfo.file.title,
                "SlackEventJSON": JSON.stringify(event, null, 4),
                "SlackFileInfoJSON": JSON.stringify(fileInfo, null, 4),
                "ImageFiles": [
                    {
                    "url": makeSlackImageURL(fileInfo.file.permalink, fileInfo.file.permalink_public)
                    }
                ],
                "Status": "no-status",
                "SharedBySlackID": event.user_id,
                "SavedBySlackID": event.user_id  
            }
        })
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
    }
}
  
module.exports = externalLinkListener
