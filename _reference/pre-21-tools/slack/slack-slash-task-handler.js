var yargs = require('yargs');
var s19 = require('../indexes/summer2019-tools');
var Airtable = require('airtable');
var moment = require('moment');

module.exports = async function(req, res, next) {
  console.log("got a new TASK REQUEST");
  console.log(JSON.stringify(req.body, null, 4));
  var theYargs = yargs.parse(req.body.text);
  var taskBase = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
  }).base(process.env.AIRTABLE_WORK_BASE);
  // find person
  console.log('got slack-slash-task post request:');
  console.log(JSON.stringify(req.body, null, 4));
  console.log(`going to search for ${req.body.user_id}`);
  var authInfo = await s19.airtableTools.findOneByValue({
    base: taskBase,
    table: "LL_PEOPLE",
    view: "Everything",
    field: "slackUserId",
    value: req.body.user_id
  });
  // console.log(JSON.stringify(authInfo, null, 4));
  if (authInfo.fields.TaskAuthorization==true) {
    console.log("creating task");
    // var theTask = new Task(authInfo);
    // if (/--/g.test(req.body.text)) {
    //   console.log("there are yargs");
    //   // theTask.URL = handleURL(theYargs);
    //   // theTask.Deadline = handleDeadline(theYargs);
    //   // if (theYargs.when) {
    //   //   theTask.temporalStatus = handleWhen(theYargs.when.toString());
    //   // }
    //   // if (theYargs.track) {
    //   //   theTask["Track?"] = true;
    //   // }
    //   if (theYargs.notes) {
    //     theTask.Notes = theYargs.notes;
    //   } else {
    //     theTask.Notes = theYargs._.join(' ')
    //   }
    //   if (theYargs.title) {
    //     theTask.Title = theYargs.title
    //   } else {
    //     theTask.Title = theYargs._.join(' ').substring(0,30);
    //   theTask.LL_PEOPLE = [authInfo.id]
    //
    //   // console.log("got authorization info from AT:");
    //   // console.log(JSON.stringify(authInfo, null, 4));
    //   console.log("about to push the task");
    //   console.log(JSON.stringify(theTask, null, 4));
    //   // var atResult = theTask;
    //   var atResult = await s19.airtableTools.sendToAirtable(theTask, taskBase, 'tasks');
    //   res.send("sent to airtable: \n" + (process.env.AIRTABLE_LINK_BASE + atResult.id + process.env.AIRTABLE_LINK_SUFFIX));
    // } else {
      // console.log("no yargs");
      var theTask = {
        Title: req.body.text.substring(0,30),
        Notes: req.body.text,
        LL_PEOPLE: [authInfo.id]
      }
      console.log("about to push the task");
      console.log(JSON.stringify(theTask, null, 4));
      // var atResult = theTask;
      var atResult = await s19.airtableTools.sendToAirtable(theTask, taskBase, 'inbox: slack');
      res.send("sent to airtable: \n" + (process.env.AIRTABLE_LINK_BASE + atResult.id + process.env.AIRTABLE_LINK_SUFFIX));
    } else {
    res.send(`unfortunately we don't have this command set up for you just yet.`)
  }

}


function handleDeadline (request) {
  // TODO: handle timezone more elegantly
  if (request.deadline) {
    var deadlineToConvert = request.deadline.toString();
    if (deadlineToConvert.length==8) {
      var dateToFormat = deadlineToConvert + "T0900";
    }
    if (deadlineToConvert.length==12) {
      var dateToFormat = deadlineToConvert.substring(0,8) + "T" + deadlineToConvert.substring(8,12);
    }
    var newDeadline = moment(dateToFormat).toISOString(true);
    // var newDeadline = moment(dateToFormat).format();
    console.log(newDeadline + " is the formatted deadline");
  } else {
    var newDeadline = moment().add(7, 'd').toISOString();
  }
  console.log("returning " + newDeadline);
  return newDeadline;
}

function handleURL (request) {
  if (request.url) {
    return request.url
  } else {
    return "none"
  }
}

function handleWhen (when) {
  var nowRegex = /now/i;
  var todayRegex = /today/i;
  var tomorrrowRegex = /tomorrow/i;
  var thisWeekRegex = /this.*?week/i;
  var nextWeekRegex = /next.*?week/i;
  var thisMonthRegex = /this.*?month/i;
  var nextMonthRegex = /next.*?month/i;
  var futureRegex = /future/i;
  var somedayRegex = /someday/i;
  if (nowRegex.test(when)) {
    return "Now";
  } else if (todayRegex.test(when)) {
    return "Today";
  } else if (tomorrrowRegex.test(when)) {
    return "Tomorrow";
  } else if (thisWeekRegex.test(when)) {
    return "This Week";
  } else if (nextWeekRegex.test(when)) {
    return "Next Week";
  } else if (thisMonthRegex.test(when)) {
    return "This Month";
  } else if (nextMonthRegex.test(when)) {
    return "Next Month";
  } else if (futureRegex.test(when) || somedayRegex.test(when)) {
    return "Future";
  }
}

// function handleWho (request) {
//   var mkRegex = /mk/i;
//   var marlonRegex = /marlon/i;
//   var kgRegex = /kg/i;
//   var katieRegex = /katie/i;
//   var jkRegex = /jk/i;
//   var jordanRegex = /jordan/i;
//   var moRegex = /mo/i;
//   var mikeRegex = /mike/i;
//   var ccRegex = /cc/i;
//   var caseyRegex = /casey/i;
//   if (true) {
//
//   }
// }


function Task(airtableData) {
  this["assigned_to"] = [
    {
      "id": airtableData.fields.AirtableId,
      "email": airtableData.fields.AirtableEmail,
      "name": airtableData.fields.AirtableName
    },
  ];
}
