const { blue, yellow, cyan, magenta } = require('../../ll-modules/ll-utilities/mk-utilities')
const airtableTools = require(`../../ll-modules/ll-airtable-tools`)
  
exports.log = async ({ ack, shortcut, context }) => {
    await ack()
    if (shortcut.callback_id == `send_me_markdown`) {
        magenta(`we have handled this send_me_markdown request elsewhere`)
    } else if (shortcut.callback_id == `show_your_work`) {
        magenta(`we have handled this show_your_work request elsewhere`)
    } else {
        magenta(`unhandled shortcut:`)
        cyan(shortcut)
    }
}

exports.showYourWork = async ({ ack, shortcut, context }) => {
    await ack()
    magenta(`have a request for show_your_work`)
    cyan(shortcut)
    yellow(context)
}

exports.sendMeMarkdown = async ({ ack, shortcut, context }) => {
    await ack()
    magenta(`have a request for send_me_markdown`)
    cyan(shortcut)
    yellow(context)
}
