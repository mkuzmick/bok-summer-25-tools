const Airtable = require('airtable')
// const fetch = require('node-fetch')
const axios = require('axios')
const llog = require('./ll-loggers')

const getNote = async function (noteId) {
    const url = `https://api.hackmd.io/v1/notes/${noteId}`
    const options = {
        // method: 'POST',
        // body: JSON.stringify('Hi there'),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HACKMD_API_TOKEN}`
        },
    }
    llog.blue(url)
    llog.blue(options)
    const response = await axios.get(url, options)
    llog.darkgray(JSON.stringify(response.data))
}

const createTeamNote = async function(title, contents){

}

module.exports.getNote = getNote

// const sendPostRequest = async () => {
//     try {
//         const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
//         console.log(resp.data);
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
// };