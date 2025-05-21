# mk-project-ll-studio-bot-23

## bases and information structure

- ingest station
    - makefolders?
    - copy to one catch-all folder then rename
    - ultimately log files on ingest


### backend and organization
- bots and databases
    - work collection
    - text collection
    - link collection


### key tables

#### metaprojects

#### projects

- one to many metaprojects
- 

#### microprojects
- relate to projects (but always?)
- 

#### actions
- reminders
- sub-microproject level tasks
- auto-generated workflows for some repeating microprojects
- 

#### tools

#### forms

#### people



## bot needs

### studioStartup

- register macros
- reset cameras
- format hyperdeck 1
- record on hyperdeck 1
- restore xml?
- 

### data entry

- pieces of work
    - with tags and fields filled in both automatically and manually



- file rename workflow
    - create folders from calendly data
    - rename files in folders to folder name
    - 
- show
    - handle posts to
        - `#ll-show-your-work`
        - `#ll-publish-your-images`

- calendar-to-X
    - calendly-to-shoot-folders
    - g-cal or airtable-to-paper

    - slack bots
    - alexa



- systemsLab
    - bots
        - show
            - collect work
            - app home
        - do
            - home
        - studio
            - ingest
            - peakgifs
            - m2s
            - tc2s
    - calendars
    - communications
        - slack
        - 
    - bases
        - work
            - resources
            - lookbooks
            - lluf work
            - mdf work
            - student work
    - space
        - atems and sdi network
            - presets
            - macros
            - apps



- Info Systems & Code (Deadline 1/27)
    - media management
        - ingest plans
        - storage plans
        - AWS plans
    - calendars
        - booking spaces and other assets/zones
            - front-desk
            - small studios & shoots
        - calendars for reporting?
            - office hours?
            - lluf shifts?
            - mdf work outside of the LL
            - consultations, etc
        - workflow for allowing users to book them
            - llufs
            - clients (calendly, etc)
        - deriving information and views from calendar data
            - shoots-to-folders, shoots-to-menus, etc
            - if calendars are used for reporting, getting this data into report form
            - sheets for hanging outside offices
            - displays of the day's events at front desk, etc
    - show-your-work-bot revisions for spring
    - do-your-work-bot revisions for spring
    - resources.xyz, menu.xyz and other front-end printable tools
- Reporting and other admin
    - midyear MDF reports
    - MDF hiring and meetings with depts
    - LL hiring
    - 22-23 report plans
    - gallery of student projects



* Student Project Gallery (MK+DD)
        * DD reaching out to faculty we supported and asking them to identify 2-3 student project they really loved
        * either an MDF or Kevin interviewing those students about their project
    * [template](/3QdQ1MfjSXCctO7XpMgVfA) for an end of term email to faculty we supported (DD)
        * including courses we've supported for media needs (DD+MK)
* database backend/slack commands/workflow zone
    * /show
    * mediabase
    * slack channel for documentation station card files (#ll-paper?)
    * calendar appointments originating in airtable (especially for scheduling resources)
        * what are the highest priority resources we need to schedule
            * front desk or some lluf appointments first
            * keep using gcal as regular for small studio and podcasting room




#### shell scripts

`ffmpeg -i /Users/spacegray/Desktop/stills-machine/vertov.mp4 vertov-%04d.jpg -hide_banner`

`ffmpeg -i /Users/spacegray/Desktop/stills-machine/vertov.mp4 -vf fps=2 /Users/spacegray/Desktop/stills-machine/vertov-%04d.jpg`





- sunday
    - copying
        - copying 2019_01 on proxy from 9_03 to 10
        - copying content of /_sort/the-tools to 10 (delete after)
        - next: 
            - delete 2020 exports just copied
            - synology2 migration from 10 to 9
            - then delete synology2 migration from 10



- ll-studio-bot-23
    - new macros
        - camera reset
        - bw and back