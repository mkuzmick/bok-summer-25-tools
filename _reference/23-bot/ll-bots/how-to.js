
exports.howto = async ({ command, ack, client }) => {
    // Acknowledge command request
    await ack();
    const airtableResult = await airtableTools.findByValue({
        baseId: process.env.AIRTABLE_BOT_BASE_ID,
        table: "HowTos",
        maxRecords: 1,
        view: "MAIN",
        field: "Name",
        value: command.text
    })
    const blocks = [
        {
            "type": "image",
            "image_url": airtableResult[0].fields.ImageLink,
            "alt_text": airtableResult[0].fields.Name
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `how to ${airtableResult[0].fields.Name}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": airtableResult[0].fields.Notes
            }
        }
    ]
    const result = await client.chat.postMessage({
        channel: command.channel_id,
        blocks: blocks
    })
}