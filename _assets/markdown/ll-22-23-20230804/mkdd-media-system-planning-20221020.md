---
tags: mk
---

# mkdd-media-system-planning-20221020

## needs

- ingest/media base
    - q: separate for ingesting and editing/delivering?
    - separate for stills/gifs/videos?
    - separate by term or by year?
- protocol for event-ingest/edit
    - stills for each and every event
        - probably lives in the exports base if there is a split, though all raw stills and videos will be tagged by event too
    - EVERYTHING gets at least one photo, one gif and an event caption
    - MANY get a stills gallery and a montage
    - SOME get a writeup with all of this inserted and a more complex montage
    - SOME have clear media deliverables associated with them (student presentations, say)
    - the options above have different deadlines
        - so it's not that everything is due 7 days later, but that stills are due the next day, simple montage due 3 days later, complex montage due 7 days later
- connections to other LL bases and projects
    - links to lookbooks and technical requirements for projects (combo of CC, JK)
    - links to reports/story (CD, DD)
    - links to workbase (maybe connected to above too)
    - links to hackmds (also connected to above)
    - links to bokphotos (maybe just from LL media, maybe from work too)


### tables, scripts and automations needed

- bases existing now
    - [the_simple-ingest-21.3](https://airtable.com/apps1jAEBZtVOe5f6/tblVSkVw3KcFULYsd/viwuOHmFrY5de3fta?blocks=hide)](https://airtable.com/app0UMi0vIUgRP7Os/tbleNFFSynLfZAVtB/viw1UPpzSrd8bGoJp?blocks=hide)
    - LL Admin Hub (to be replaced by ll-central-hub)
- bases 2023
    - [mediaBase](https://airtable.com/appnDvK7yDPv1BBq6/tblACW9egHNAhCGqE/viwzLVjl4LygiuBGW?blocks=hide)
    - [workBase](https://airtable.com/app2Q5werGGNgVOiE/tblOpwBFVvFAGlPER/viwAA7e2h1hsyw52b?blocks=hide)
    - [avSystem](https://airtable.com/appXstXx9YkMYcori/tblUzIQklufEEcE7e/viw0RxbWT7JItAOAf?blocks=hide)
    - [Tags](https://airtable.com/appXjzaxi5pObSfqu/tblTtpWn8ai7QvOIW/viw1xRj2RqigLusAA?blocks=hide)
    - [centralHub](https://airtable.com/app0UMi0vIUgRP7Os/tbleNFFSynLfZAVtB?blocks=hide)
- new tables needed?
    - raw stills
    - edited stills
    - raw video files
    - edited videos
    - auto gifs
    - edited gifs
    - events enhanced
- bots and tools
    - 22-23-tools (command line scripts)
    - ll-studio-bot (runs on Mac Studio in brick room, connects to ATEMs and media, ONLY installed on the ll-studio Slack team for now)
        - has hooks for unidirectional
    - do-your-work-bot
        - /actions
        - what else ?
    - show-your-work-bot (runs on Heroku and is installed on central Bok Slack)
        - handles photos-2-markdown in #show-your-images
        - handles show and tells
    - next apps that are mainly front-end focussed (share back-ends with all of the above)
        - ll-menu
        - course-specific galleries
        - people and project-specific galleries