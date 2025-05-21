const axios = require('axios');
const token = 'YOUR_ACCESS_TOKEN'; // Replace with your Slack app access token
const llog = require('../../ll-utilities/ll-logs')
const fs = require('fs')

async function getSlackChannels(token) {
    try {
      const response = await axios.get('https://slack.com/api/conversations.list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.ok) {
        return response.data.channels;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(`Failed to retrieve channels: ${error.message}`);
    }
  }

  
  async function getSlackUsers(token) {
    try {
      const response = await axios.get('https://slack.com/api/users.list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.ok) {
        return response.data.members;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  }


  async function getSlackEmojis(token) {
    try {
      const response = await axios.get('https://slack.com/api/emoji.list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.ok) {
        return response.data.emoji;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(`Failed to retrieve emojis: ${error.message}`);
    }
  }

  module.exports = async (yargs) => {
    llog.magenta(yargs)
    // getSlackChannels(yargs.token)
    // .then(channels => {
    //   console.log('Channels:', channels);
    //   fs.writeFile('./_exports/slackChannels.json', JSON.stringify(channels, null, 4), 'utf8', err => {
    //     if (err) {
    //       console.error('Error writing JSON file:', err);
    //     } else {
    //       console.log('Channels saved to slackChannels.json');
    //     }
    //   });
    // })
    // .catch(error => {
    //   console.error('Error:', error.message);
    // });
    // getSlackUsers(yargs.token)
    // .then(users => {
    //   console.log('Users:', users);
    //   fs.writeFile('./_exports/slackUsers.json', JSON.stringify(users, null, 4), 'utf8', err => {
    //     if (err) {
    //       console.error('Error writing JSON file:', err);
    //     } else {
    //       console.log('Users saved to slackUsers.json');
    //     }
    //   });
    // })
    // .catch(error => {
    //   console.error('Error:', error.message);
    // });
    getSlackEmojis(yargs.token)
        .then(emojis => {
            // Convert emojis to JSON string
            const emojisJSON = JSON.stringify(emojis, null, 2);

            // Write the JSON string to a file
            fs.writeFile('./_exports/slackUsers.json', emojisJSON, 'utf8', err => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('Emojis saved to slackEmojis.json');
            }
            });
        })
        .catch(error => {
            console.error('Error:', error.message);
        });


  }