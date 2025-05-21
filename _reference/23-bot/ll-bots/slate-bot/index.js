const airtableTools = require(`../../ll-modules/ll-airtable-tools`)
const { llog } = require('../../ll-modules/ll-utilities')
const createSlateView = require('./create-slate-view')

const slateBot = async ({ command, ack, client }) => {
    // Acknowledge command request
    llog.magenta(`heard slate slash:\n${JSON.stringify(command, null, 4)}`)
    await ack();
    let terms = command.text.split(" ");
    let uniqueTerms = ["start", "stop", ...new Set(terms)];
    const slateView = await createSlateView({
        user: command.user_id, 
        trigger_id: command.trigger_id,
        commandText: command.text,
        uniqueTerms: uniqueTerms
    })
    llog.yellow(slateView)
    try {
        const result = await client.views.open(slateView);
    } catch (error) {
        llog.red(error)
    }
}

module.exports = slateBot