# systems convo 20221121

## main LL bases-
* show your work base
    * 2015-current
    * semi permanent 
    * connect to show your work bot
    * would be great to print out shoot reports and project report (so have some kind of front end)
    * /show to bring up a modal that could give us more structured data? instead of just posts in show-your-work
    * this base might split off as we continue working, but just start with one for now
* do your work base
    * current year
    * (work base)
    * will feed menu.xyz next app
    * events will originate out of here
* media base
    * evergreen
    * likely have to split by term or year tho
    * some stuff (like edited stills) will go into the show base
    * front desk person can help populating this base with data as the day goes on
* central hub
    * evergreen
    * higher level of permissioning
    * the way we would stich everything together
    * provider of unique ideas
    * tags, forms, people, etc.

## key regions of work on the system

- ll-studio-bot-23
    - airtable = studio-bot or systems & media bases
- ll-do-your-work-bot-23 & menu.xyz
    - airtable = work-base
- ll-show-your-work-bot-23 & report or show.xyz
    - airtable = gallery
- physical studio & space
    - airtable = studio-bot or systems  & media bases
- actually making things: projects, prototypes & resources (work)
    - airtable = gallery and others


### actions/priorities
* create gallery/report base
    * function as backend for show your work bot and next app
    * experimental base abby worked on prototyping: https://airtable.com/apph1ryLCgBur8pyJ/tblprFJQrF8pqj0Vd/viw5m7Gou37S3B8XI?blocks=hide
* dd + jk will work on testing creating events in airtable and then sending them to google cal (with the goal of airtable as the originator of ALL)
    * understanding what is possible to do out of airtable in this direction
* figure out how to sunset hackMDs and get them into airtable, and also potentially generate hackMDs out of airtable 
    * test with reports christine wrote on the labs
* figuring out how to get information into airtable without a bunch of additional airtable forms and fields
* jk will work on next.js - printable views of menu (work-base) and report cards (gallery-base)
* work on /show bot!!

### projects and microprojects

microprojects
* `/show` command that creates modal for show-your-work moments (JK?)
* rebuilding the mdf reports out of airtable (DD + CD)
* print daily LLUF tasks (JK)
* shoot report (MK) and other designed docs
* building events out of airtable (DD+JK+CD)
    * button to schedule an event within a project in the do your work base
    * can use this as a test base https://airtable.com/apph1ryLCgBur8pyJ/tblprFJQrF8pqj0Vd/viw5m7Gou37S3B8XI?blocks=hide
* how to create hackMDs from airtable and how to bring back the hackMD data into airtable, then refresh that hackMD (JK+DD?!)

work this week on these microprojects, check in at monday's stand up about how much progress we've made. then see what types of deadlines are reasonable


---
### notes on getting airtable to gcal:

from [google api](https://developers.google.com/calendar/api/guides/create-events#javascript)
```
const event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

const request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  appendPre('Event created: ' + event.htmlLink);
});
```


from [airtable](https://support.airtable.com/docs/automatically-schedule-google-calendar-events-from-airtable)
