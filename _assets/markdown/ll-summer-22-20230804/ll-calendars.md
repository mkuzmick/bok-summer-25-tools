---
tags: projects
---

# ll-calendars

## existing calendars
ll-central
Learning Lab Events - more public events that fellows were invited to
ll-staff - Absences (now Bok Absences is really used)

ll-report
ll-menu

media@learninglab.xyz
ll-media-captured
ll-shoot-schedule

LLUF Schedule
MDF Schedule
MPA Schedule

50Church_372
50Church_SmallStudio
50Church_Studio308
50Church_BigFellowsRoom
50Church_BrickRoom
50Church_Classroom
50Church_FireplaceRoom
50Church_ReadingRoom
50Church_SmallFellowsRoom
50Church_SmallStorage






## functions

- resource/room booking
    - so one for each resource
- shoots
    - booking shoots
    - logging shoots (with metadata) for various workflow purposes
- planning
    - appointments
    - events
        - public
        - smaller publics
        - private
- reporting
    - events
    - this year have all MDFs and Staff invite LL Report to events after the fact? or duplicate in report?


## notes on g cal workflow

- create anywhere, but add all staff as admins
    - add studio@learninglab.xyz as admin? for all? (admin@learninglab.xyz)
- let's make an account that has access to all private appointments rather than giving studio global access



## possible 22-23 calendars

### BEFORE the events
- **ll-plan** (everything we have to be ready to do) - everything really originates here and other calendars are invited to these events
- **ll-shoots** (shoots upcoming)
- **ll-menu** (public-facing, on screens) to be decided during monday standups
    * where is this calendar! who owns this!

### AFTER the events

- **ll-report-this** (maybe for everyone? essentially sends a request for this event to be documented)
- **ll-report** (the complete, normalized calendar of everything we've done)
- **ll-media-captured** (things that have been captured, integrated into workflow)-- interface might be an ipad that travels
- (no need for ll-media-captured-final, because this exists in the already existing shoot base)

### resource calendars
#### proposed new ones:

306_ControlRoom
307_MusicStudio
308_MainStudio
310_SmallStudio

388_Storage1
372_Storage2
387_Storage3

377_EditingSuite
381_GlassStudio

385_FireplaceRoom (ask Laura about removing "50Church"?)
375_50ChurchClassroom






### The Technical Things TODO:

* get from **ll-report-this** to **ll-report**
    * some different models to work on in parallel:
        * staff
        * mdf
        * llufs
        * different types of events
    * let's take the designLab meeting as one to work on as an example.

#### A SAMPLE CASE STUDY
 a designLab meeting for a course on video games
 

 
 
 1. initial consultation with faculty. Gets scheduled as an appointment for 4 individuals (3 staff plus faculty), say and also added to ll-plan if it isn't started there.  
 2. then the consultation event happens and we get prompted to invite ll-report-this, which may prompt us for more data in Slack before creating a record in ll-report(final)
     - for instance, if there isn't yet a project associated with the event, it asks for the project (and we need to initiate it in the projects table, say)
 3. then the designLab happens, and let's say we have 3 staff, 2 MDFs and 3 LLUFs there.
     - dLab is scheduled in ll-plan, and staff, mdfs and llufs are invited as individuals, and shoots is invited if we want it captured, and menu is invited
     - after the event, ll-media-captured is invited to the initial calendar event (and if there are more things we would call a "shoot" that happened, additional events will get added to ll-media-captured).
     - media gets renamed with help of ll-media-captured cal (and any additional scripted stills requests from airtable)
     - we want different participants to report in different ways
         - maybe some people do nothing
         - maybe someone on staff does a formal 2-sentences to 2-paragraphs
         - but there could also be individual summaries, reports and media, of the sort that are currently captured mainly in show-your-work
             - we might want captions on media, say, in which case we should wait until that media is done
             - maybe right away you are asked if you'll need media for this report
             - we might also just want text-based reflections (like if it's a test and we need LLUFs to give feedback on X)
             - sometimes people might have each created a prototype or piece of media as part of the event, in which case we want to make sure that we've captured this (and maybe ask for a caption)
 
     
     

## mechanics

- editing (based on ID)
- app home with "my" posts
 
 
 
 ## additional ideas
 * like project launch meeting, have a review meeting at the end of the week to review report-this things to move to report-final
     * so kind of regular LL staff meetings would be:
         * weekly standup 9am mondays
         * weekly project launch meetings when?
         * weekly report review meetings when?
 * systems for insuring that we have time to for staff to do things
 