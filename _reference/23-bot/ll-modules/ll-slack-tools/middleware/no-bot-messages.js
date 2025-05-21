const noBotMessages = async ({ message, next }) => {
    if (!message.subtype || message.subtype !== 'bot_message') {
        await next();
    }
}

module.exports = noBotMessages