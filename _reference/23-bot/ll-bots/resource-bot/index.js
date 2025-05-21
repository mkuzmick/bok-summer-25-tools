const airtableTools = require('../../ll-modules/ll-airtable-tools')
const llog = require(`../../ll-modules/ll-utilities/ll-logs`)
const ogs = require('open-graph-scraper');

async function getOgData (url) {
    const result = await ogs({url: url})
        .then((data) => {
            const { error, result, response } = data;
            console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
            console.log('result:', result); // This contains all of the Open Graph results
            // console.log('response:', response); // This contains the HTML of page
            return (result)
        })
    return (result)
}

module.exports.resourceFromMessageLink = async function (message) {
    console.log(`starting resourceFromMessageLink`)
    const theResourceLinks = []
    for (let i = 0; i < message.blocks.length; i++) {
        const block = message.blocks[i];
        for (let j = 0; j < block.elements.length; j++) {
            const element = block.elements[j];
            for (let k = 0; k < element.elements.length; k++) {
                const subelement = element.elements[k];
                if (subelement.type == "link") {
                    theResourceLinks.push(subelement.url)
                }
            }
        }
    }
    let theResource = {
        title: `link`,
        blocks: message.blocks,
        links: theResourceLinks
    }
    for (let i = 0; i < theResourceLinks.length; i++) {
        const element = theResourceLinks[i];
        let ogData = await getOgData(element);
        llog.yellow(`sending to airtable`)
        llog.magenta(element)
        llog.cyan(ogData.ogTitle)
        airtableTools.addRecord({
            baseId: process.env.AIRTABLE_STUDIO_BOT_BASE,
            table: "ResourceLinks",
            record: {
                URL: element,
                OgData: `coming soon`
            }
        })
    }
    return (theResource)
}