// const { findRecordByValue, findRecordById, addRecord } = require('../../ll-modules/airtable-tools')
const { magenta, gray, darkgray, yellow, blue, divider, red } = require('../../ll-modules/ll-utilities/ll-logs')
const axios = require('axios');

// const createTeamNote = async function(options){
//   try {
//       const data = {
//           "title": options.title,
//           "content": options.content,
//           "readPermission": "owner",
//           "writePermission": "owner",
//           "commentPermission": "everyone"
//       }
//       yellow(data)
//       yellow(process.env.HACKMD_API_TOKEN)
//       const response = await axios.post(`https://api.hackmd.io/v1/teams/${options.team}/notes`, data, {
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${process.env.HACKMD_API_TOKEN}`
//           },
//       });
//       yellow(response.data)
//       return response.data
//   } catch (error) {
//       llog.red(error)
//   }
// }



module.exports = async ({ ack, body, view, client, logger }) => {
    // Acknowledge the view_submission request
    // const title = view.state.values.project_title.project_title_input.value || "No Title"
    // const notes = view.state.values.project_description.project_description_input.value || "No Notes"
    // const launchType = view.state.values.project_type.project_type_input.selected_option.value
    // const taskRecord = {
    //   Title: title,
    //   Type: [launchType],
    //   Notes: notes,
    // }
    red(divider, divider, "slate_submission", divider, divider)
    blue(divider, "view", view)
    darkgray(divider, "body", body) 

    // const assignedToSlackIds = view.state.values.collaborators.collaborators_input.selected_users || null;
    // const assignedToAirtableUsers = []
    // // const availableForSlackChannels = view['state']['values']['available_for']['AvailableFor']['selected_conversations'] || null;
    // const availableForAirtableUsers = []
    // try {
    //   yellow('trying hackmd')
    //   const hackmdResult = await createTeamNote({
    //     title: title,
    //     content: `---\ntags: ${launchType}\n---\n\n# ${title}\n\n${notes}`,
    //     team: process.env.HACKMD_TEAM_ID
    //   })
    //   // const hackmdResult = await createTeamNote()
    //   magenta("hackmd result", hackmdResult)
    //   taskRecord.WorkingDoc = `https://hackmd.io/${hackmdResult.id}?both`;
    // for (let i = 0; i < assignedToSlackIds.length; i++) {
    //   const slackId = assignedToSlackIds[i];
    //   try {
    //     const personResult = await findRecordByValue({
    //       baseId: process.env.AIRTABLE_WORK_BASE,
    //       table: "Workers",
    //       field: "SlackId",
    //       view: "MAIN",
    //       value: slackId
    //     })
    //     const workerPropsResult = await findRecordByValue({
    //       baseId: process.env.AIRTABLE_WORK_BASE,
    //       table: "WorkerProps",
    //       field: "SlackChannel",
    //       view: "MAIN",
    //       value: slackId
    //     })
    //     assignedToAirtableUsers.push(personResult.id)
    //     availableForAirtableUsers.push(workerPropsResult.id)
    //   } catch (error) {
    //     red(divider, `${slackId} is not yet a User in the WorkBase`, divider)
    //   }
    // }
    
    // const assignedByAirtableUsers = []
    // try {
    //   const assignedByResult = await findRecordByValue({
    //     baseId: process.env.AIRTABLE_WORK_BASE,
    //     table: "Workers",
    //     field: "SlackId",
    //     view: "MAIN",
    //     value: body.user.id
    //   })
    //   assignedByAirtableUsers.push(assignedByResult.id)
    // } catch (error) {
    //   red(error)
    // }
    
    // if (assignedByAirtableUsers) {
    //   taskRecord.AssignedBy = assignedByAirtableUsers
    // }
    // if (availableForAirtableUsers) {
    //   taskRecord.AvailableFor = availableForAirtableUsers
    // }
    // magenta(taskRecord)
    // try {
    // //   const airtableResult = await addRecord({
    // //     baseId: process.env.AIRTABLE_WORK_BASE,
    // //           table: "Tasks",
    // //           record: taskRecord
    // //   })
    // //   magenta(`saved to airtable`, airtableResult)
    //   try {
    //     // Create a new modal view with the submission results
    //     const modal = {
    //       type: 'modal',
    //       title: {
    //         type: 'plain_text',
    //         text: 'Form Submitted',
    //       },
    //       blocks: [
    //         {
    //           type: 'section',
    //           text: {
    //             type: 'mrkdwn',
    //             text: 'Your form has been successfully submitted.',
    //           },
    //         },
    //         {
    //           type: 'section',
    //           text: {
    //             type: 'mrkdwn',
    //             text: `here's the <https://hackmd.io/${hackmdResult.id}?both|HackMD link>.\nand here's the <${process.env.AIRTABLE_TASK_LINK_TEMPLATE}/${airtableResult.id}??blocks=hide|Airtable link>`,
    //           },
    //         },
    //       ],
    //       close: {
    //         type: 'plain_text',
    //         text: 'Close',
    //       },
    //       // submit: {
    //       //   type: 'plain_text',
    //       //   text: 'Submit',
    //       // },
    //     };
    
    //     // Open the new modal view
    //     const response = await client.views.open({
    //       trigger_id: body.trigger_id,
    //       view: modal,
    //     });
    
    //     // Check for errors and log the response
    //     if (!response.ok) {
    //       logger.error(`Failed to open modal view: ${response.error}`);
    //     } else {
    //       logger.info(`Modal view opened successfully: ${response}`);
    //     }
    //     } catch (error) {
    //       logger.error(`Error opening modal view: ${error}`);
    //     }
    // } catch (error) {
    //   red(error)
    // }
      
    // } catch (error) {
    //   red(error)
    // }


    ack();  
}



