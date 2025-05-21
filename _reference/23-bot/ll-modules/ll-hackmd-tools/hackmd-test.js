const { llog } = require('../ll-utilities')
const axios = require('axios')

const hackmdtest = async function (options) {
    llog.magenta(options)
    try {
        const responseData = await createTeamNote()
        llog.blue(responseData)
    } catch (error) {
        llog.red(error)
    }
}

const getUserNotes = async function (options) {
    try {
        const response = await axios.get('https://api.hackmd.io/v1/notes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HACKMD_API_KEY}`
            },
        });
        // llog.yellow(response.data)
        return response.data
    } catch (error) {
        llog.red(error)
    }
}

const getUserTeams = async function(options){
    try {
        const response = await axios.get('https://api.hackmd.io/v1/teams', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HACKMD_API_KEY}`
            },
        });
        // llog.yellow(response.data)
        return response.data
    } catch (error) {
        llog.red(error)
    }
}

const getTeamNotes = async function(options){
    try {
        const response = await axios.get('https://api.hackmd.io/v1/teams/ll-23-24/notes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HACKMD_API_KEY}`
            },
        });
        // llog.yellow(response.data)
        return response.data
    } catch (error) {
        llog.red(error)
    }
}

const createTeamNote = async function(options){
    try {
        const data = {
            "title": "New note 2",
            "content": "# note content\n in here",
            "readPermission": "owner",
            "writePermission": "owner",
            "commentPermission": "everyone"
        }
        
        const response = await axios.post('https://api.hackmd.io/v1/teams/mk-tests-23/notes', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HACKMD_API_KEY}`
            },
        });
        llog.yellow(response.data)
        return response.data
    } catch (error) {
        llog.red(error)
    }
}

module.exports = hackmdtest