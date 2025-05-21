// import { blue, magenta, cyan, yellow } from '../ll-utilities/ll'

const imageToAirtable = async (imageData) => {

    try {
        
    } catch (error) {
        
    }


//   try {
//     publicResult = await client.files.sharedPublicURL({
//         token: process.env.SLACK_USER_TOKEN,
//         file: message.files[0].id,
//     });

//     const theRecord = {
//         baseId: process.env.AIRTABLE_SHOW_BASE,
//         table: "ShowYourImages",
//         record: {
//             "Id": `${message.files[0].name}-${message.event_ts}`,
//             "Title": message.files[0].title,
//             "FileName": message.files[0].name,
//             "SlackFileInfoJson": JSON.stringify(message.files[0], null, 4),
//             // "SlackFileInfoJSON": JSON.stringify(fileInfo, null, 4),
//             "ImageFiles": [
//                 {
//                 "url": makeSlackImageURL(message.files[0].permalink, message.files[0].permalink_public)
//                 }
//             ],
//             "SlackUrl": makeSlackImageURL(message.files[0].permalink, message.files[0].permalink_public),
//             "PostedBySlackUser": message.files[0].user,
//             "SlackTs": message.event_ts
//         }
//     }
//     magenta(divider)
//     cyan(theRecord)
//     const airtableResult = await airtableTools.addRecord(theRecord) 

//     const mdPostResult = await client.chat.postMessage({
//         channel: message.channel,
//         thread_ts: message.ts,
//         unfurl_media: false,
//         unfurl_links: false,
//         parse: "none",
//         text: `here's the markdown for embedding the image: \n\`\`\`![alt text](${makeSlackImageURL(message.files[0].permalink, message.files[0].permalink_public)})\`\`\``
//     })
// } catch (error) {
//     console.log(error)


}


export { imageToAirtable }