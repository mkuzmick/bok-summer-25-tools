const Airtable = require('airtable');

const getRecordsFromView = async ({ baseId, tableName, viewName, apiToken, fields = null }) => {
    const base = new Airtable({ apiKey: apiToken }).base(baseId);
    
    try {
        const selectOptions = {
            view: viewName
        };

        // If specific fields are requested, add them to the select options
        if (fields) {
            selectOptions.fields = fields;
        }

        const records = await base(tableName).select(selectOptions).all();
        
        // Transform records to a more usable format
        return records.map(record => ({
            id: record.id,
            fields: record.fields,
            createdTime: record._rawJson.createdTime
        }));
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
};

const formatMarkdown = (records, options = {}) => {
    const {
        titleField = 'EntryTitle',  // Default title field
        dateField = 'DateOccured',  // Date field
        excludeFields = [],         // Fields to exclude from output
        imageFields = [],          // Fields that contain image URLs
        heroField                  // Optional hero image field
    } = options;

    return records.map(record => {
        const fields = record.fields;
        let markdown = '';

        // Add hero image if specified and exists, otherwise fall back to ImageURL
        const heroImage = heroField && fields[heroField] ? fields[heroField] : fields['ImageURL'];
        if (heroImage) {
            markdown += `![${fields[titleField] || 'hero image'}](${heroImage})\n\n`;
        }

        // Add title as h2
        if (fields[titleField]) {
            markdown += `## ${fields[titleField]}\n\n`;
        }

        // Add date if exists
        if (fields[dateField]) {
            markdown += `*${fields[dateField]}*\n\n`;
        }

        // Add other fields
        Object.entries(fields)
            .filter(([key]) => 
                key !== titleField && 
                key !== dateField && 
                !excludeFields.includes(key))
            .forEach(([key, value]) => {
                if ((key === 'ImageURL' && value && key !== heroField) || (imageFields.includes(key) && value)) {
                    // Handle image URL (skip if it's the hero image)
                    markdown += `![${fields[titleField] || 'image'}](${value})\n\n`;
                } else if (Array.isArray(value)) {
                    // Handle arrays (like Project field)
                    markdown += `### ${key}\n${value.join(', ')}\n\n`;
                } else if (value) {
                    // Handle regular text fields
                    markdown += `### ${key}\n${value}\n\n`;
                }
            });

        markdown += '---\n\n';
        return markdown;
    }).join('');
};

const at2md = async ({ base, table, view, apiToken, fields, format = true, formatOptions = {} }) => {
    if (!apiToken) {
        throw new Error('apiToken is required');
    }

    try {
        const records = await getRecordsFromView({
            baseId: base,
            tableName: table,
            viewName: view,
            apiToken,
            fields: fields
        });

        if (format) {
            const markdown = formatMarkdown(records, formatOptions);
            // Save to a markdown file
            const fs = require('fs');
            const outputPath = `${process.cwd()}/airtable-export-${Date.now()}.md`;
            fs.writeFileSync(outputPath, markdown);
            console.log(`Markdown saved to: ${outputPath}`);
        } else {
            console.log(JSON.stringify(records, null, 2));
        }

        return records;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

module.exports = {
    at2md,
    getRecordsFromView,
    formatMarkdown
};
