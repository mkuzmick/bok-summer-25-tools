---
tags: MPA,
---

# 20230331 MPA ToolTime

https://workflow.frame.io/guide/

* New task system! 
    * how it works
    * what to expect

### The infrastructure of an ATEM-based studio

#### set up an ATEM 1 m/e mini studio in classroom, with overhead -- test chroma key and luma keys

* exposure
* color temperatures 
* switcher
* Framing
    * retaining some of the table
    * centering/balanced comp
* mic placements
* ATEM routing
    * aka why we usually end up with multiple recordings

### The ingest system

* the workflow(quick overview)
    * shootIDs
        * date
        * location
        * time
        * client
        * project
        * event
* where is the footage
    * Synology infrastructure
    * finding/pulling down footage
    * finding proxies
    * generating proxies
        * codecs and file types
        * our standards, but also just what's useful
    * working files vs archived files
        * versioning
* project files
    * naming working files
    * where to archive 
    * 
* types of recordings
    * hyperdecks
    * amx's
    * in-cam
    * podcasting 
    * stills
    * RAW footage
* types of recording media


### Day to day studio

* Time of day workflow
    * setting up the control room 
    * running the sync script
        * why?
* Setting up/shutting down the studio
    * what are the most common 
        * camera stations
        * lights
        * computer stations
    * xmls vs macros
        * daily xmls
        * camera setup macros
        * amx macros

### post-processing

#### stills challenge: take 5 stills from a video clip, export them and turn them into 15 deliverable edits

* color management
    * rec709 vs rec2020
    * where we want our images to land
        * temp
        * tint
    * codecs and file types
        * our standards 
        * but also just what's useful
* color correcting 
    * what to look for 
        * high saturation
        * skin tone accuracy
        * scopes
* getting the best out of your images
    * multiple edits
        * duo toning
        * B/W high con
        * standard
        * double exposures?
        * reframing compositions
        * panelling

### Checklists

#### Morning Startup
* Power on the control room
    * run the /a8ksync command in slack(will only work once the rack is powered on)
* Power on the main camera positions
    * what cameras will be used for this shoot? 
        * are they studio or cinema cameras? 
        * do they need batteries?
* Check that all lights are on
* Log into any computers that are connected to the system