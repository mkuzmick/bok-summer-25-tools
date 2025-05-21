# Deliverables and Media Tracking
(Luke with Katie+friends)
* deliverables and to-do tracking (Luke with Katie)
* airtable for media in process (and done)


## Existing bases to consider
**Media trackers:**
* [Media Requests](https://airtable.com/appIfFUqynmExdUPH/tbltJBbQHhn18Uj5M/viw8rfgQhk46tuzso?blocks=hide) (active)
* [workBase](https://airtable.com/appIfFUqynmExdUPH/tblkn3YHybiGqYzt2/viwPtzQ0gtKuuc79z?blocks=hide)
* [mediaBase](https://airtable.com/app2Xo74Ex0E0kosj/tblLnwGBKBPeTBtlO/viwD1P9M4iyHHDO4r?blocks=bipVk5fxnjbCEkC9V)


**Export bases:**
* [ExportBase01](https://airtable.com/app2L6zc3OKxEI2AA/tbl8fvruYOR61W0mr) - This is scraped from Vimeo and Youtube, it doesn't contain anything that is uploaded to Drive or to Slack, etc etc.
    * Vimeo
    * Youtube


## Goal
Our goal is to create more media and better media, and to populate it with data that will help speed and augment our media process (course info, student names, permissions info, etc)

**Features:**
* Student names + Email
* Appointment info
* Permissions
* Project data (already linked) 
* Class info
* Link to IngestBase

**Questions:**
* If we know that there are going to be X number of videos requested from a particular shoot, we can prepopulate (either the **media requests base** or the exports base?)
* Request vs. media from the request. There's 1 request but there's 5 pieces of media associated with it...
* Where should people get tagged? **In Ingest** or in Exports?

What does this Media spaghetti monster look like...
* An Ingest Base
    * An entry for every media event
    * Linked to the Events Base
    * Have a single select the identifies which shoots are being prepopulated and which have actually happened
        * **Instead, have an appointments table and only push shoots into the ingest base when they are needed.**
* An Events Base
    * Tagged with people and class info
    * Permissions information
    * Connected to media@learninglab.xyz calendar + LL Central
    * Get the client, project, and media type into the calendar
        * EXPOS20Saha_S22
            * EXPOS20Saha_S22BEAT_Workshop
        * HH22
            * HH_22_Presentation
            * HH.Portraits.Stills
        * ARAMONT22
        * GENED1080
        * Possiblities:
            * Identifying the semester in the project name
            * Using tags
            * Should appointments start in Airtable?
* An Editing/Exports base with at least 2 (original) tables.
    * Media Requests table which info on what people want, when, that links to the IngestBase.
    * Exports table that includes links to all of the media that is created from the requests.
        * File size
        * Location / Hosting platform
        * Should link back to the original shoots
            * Should definitely link to the project in some way.

### Future things to keep in mind
* Permissions
    * Information about permissions, living alongside the media
    * Permissions that have been given after the fact in a limited way
    * Permissions are granted based on the type -- like LL staff or fellows
* Student names and information surrounding the projecs to be done
    * Group names, automated file names based on students, title cards, etc.
* MC_CC_EX
* Proxying


## ROADMAP IT!

What will make life faster and easier?

Prioritized list of features:
1. By Monday 1/24: getting all MXF and ProRes out of the system
2. By Monday 1/31: Auto-stills
3. By Monday 1/31: Automated multiclips
4. peakGifs
5. Creating the events base



Next steps:
* Katie/Casey/Luke meet to list and prioritize features above 
* Katie and Marlon meet to talk quickly about where events are initialized, so that she can move forward in making the EventsBase