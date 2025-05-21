const { makeSlackImageUrl } = require('../ll-slack-tools/utils')

const rawStill = ({ dataType, data }) => {
    if (dataType == "slackFileInfo") {
        return {
            title: data.file.title,
            publicUrl: makeSlackImageUrl(data.file.permalink, data.file.permalink_public),
            dataType: dataType,
            data: data
        }
    } else {
        
    }
    return {
        
    }
}

module.exports = rawStill