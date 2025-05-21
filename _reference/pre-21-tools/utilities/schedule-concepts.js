// var scheduleTest = async function (settings) {
//   console.log("launching scheduleTest");
//   var rule = new schedule.RecurrenceRule();
//   rule.second = 30;
//   await schedule.scheduleJob(rule, function(){
//     var newNow = new Date();
//     console.log(moment().format(`YYYYMMDD-HHmmss.SSS`));
//     console.log(newNow);
//     console.log('1 second after the minute!');
//   });
//   var date = new Date(2019, 12, 08, 10, 33, 0);
//   console.log(`date is ${date} and now is ${new Date()}`);
//   var j = schedule.scheduleJob(date, function(){
//   console.log('is it 10:32?.');
//   console.log(`date is ${date} and now is ${new Date()}`);
//   });
// }

var scheduleTest = async function (settings) {
  console.log("launching scheduled task");
  var CronJob = require('cron').CronJob;
  new CronJob(
    '*/10 * * * * *',
    function() {
      console.log(`You will see this message every five seconds ${chalk.magenta(moment().format(`YYYYMMDD-HHmmss.SSS`))}`);
    },
    null,
    true,
    'America/New_York'
  );
}
