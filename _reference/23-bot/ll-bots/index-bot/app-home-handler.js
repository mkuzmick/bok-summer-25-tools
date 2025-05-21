const { blue, yellow, cyan, magenta, gray } = require('../../ll-modules/ll-utilities/mk-utilities')

module.exports = async function ({client, event }) {
    try {
        // Call views.publish with the built-in client
        const result = await client.views.publish({
          // Use the user ID associated with the event
          user_id: event.user,
          view: {
            // Home tabs must be enabled in your app configuration page under "App Home"
            "type": "home",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "*Welcome home, <@" + event.user + "> *"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Let's work at finding some of your images to display."
                }
              }
            ]
          }
        });
        magenta(result)
      }
      catch (error) {
        logger.error(error);
      }
}
