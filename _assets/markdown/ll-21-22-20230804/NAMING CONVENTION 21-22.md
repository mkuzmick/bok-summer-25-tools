# NAMING CONVENTION 21-22

past conventions

## 2014-2020

YYYYMMDD_counter_Project_SubProject_Camera_counter.mov
for instance:
20180901_001_LL_BTS_5Da_001.mov


## 2021-22

Basically shoots are

UNIQUEID_DESCRIPTION

and files are

UNIQUEID_DESCRIPTION_SOURCE.COUNTER.ext

Let's break each segment down. (Note, we can still think about whether underscores are the ideal separator between these elements)

### UNIQUE ID SEGMENT

YYYYMMDD.location.eventCounter

Questions remain about what should be zero-padded. Anything we'd like to sort well in FCPX should be. This will definitely happen at the file level, but maybe we'd like it to happen at the eventCounter level too.

20210910.0.001
20210910.0.002
20210910.2.001
20210910.2.002
20210910.2.003
20210910.2.004
20210910.2.005

etc.

In Airtable, the `Location` property should be a link to another record.


### DESCRIPTIVE SEGMENT

client.project.eventType

or let's make this Client/Group/Unit.Project.EventType. In the Airtable, all of these should be links to other records.

* Client (clients can be "corporate"--i.e. departments, courses, units, etc) MetaProjects might include course number or department/client ID etc. In most cases this will be client, in fact, which means we should think for a moment about whether Client.Project.Event is actually more appropriate?
* Projects need to be short abbreviations or acronyms that map on to records on the Projects tale in a one-to-one way (in fact, we'll undoubtedly be linking to these records in the base). 
* For things that don't have a natural project, catch-all or catch-some projects will have to be invented.
* EventType can specify the type of actual event (workshop, performance, etc) or just the type of footage (bRoll, etc)

### RECORDING SOURCE + ID SEGMENT

sourceModel.alphabeticId.stream.counter.ext. Link to another record for source, but the table should live in `_the-AVSystem` base

* source make and model can be abbreviated--usually model is the most natural option
    * C200 or c200
    * 5D4 or 5d4
    * ATEMMX or AMX or amx
    * ATEMM or AM or am
    * ATEM4K or A4K or a4k
    * ATEM8K or A8K or a8k
* for the camera number/id, letters seem safe, and if we ever do have more than 26 of a source, additional letters or even acronyms could be added without it seriously affecting the system
    * a, b, c, etc
    * but also aa, ab, ac
    * or mk, cc, or even marlon, casey, etc
        * screenflow.mk.001.mov
        * screenflow.marlon.002.mov
        * etc
* stream would be something new, but we already have it in a sense, and it matches structures and intuitions connected to ffmpeg and media production more broadly
    * for ATEMs, we have
        * pgm
        * pgm audio
        * video 1
        * audio from video 1
        * video 2
        * audio from video 2
        * video 3
        * audio from video 3
        * etc
    * and even for C200s, say, there is the potential to mix up
        * internal log footage caught on the CFast card
        * internal h264 captured to the SD
        * footage recorded to a dedicated shogun sitting next to the cam, perhaps with a LUT applied or other audio mixed in, say
    * so we should specify this with the tightest abbreviation or acronym we can manage
        * for the ATEMS
            * amx.a.v1
            * amx.a.a1
            * amx.a.v2
            * amx.a.a2
            * amx.a.pgm
            * etc
        * for BGH1s, C200s, etc
            * bgh1.a.h264
            * or bgh1.a.sd
            * bgh1.a.prores (for shogun footage if we want to continue naming these files by the camera, which feels natural, rather than the recording device---if and only if the recording device remains mapped to a single camera for the duration of the shoot . . . which is what distinguishes it from ATEM footage)
* for the counter, three digits with zero-padding has been fine, but it's easy to imagine scenarios where more would be needed.
    * option 1: make everything more digits (4? 5? 6?)
    * option 2: 
        * have the script catch folders with more than 1000 elements and 
            * either fail with error reporting 
            * or ask for permission to run with more digits in the counter . . . 
            * or just run with the appropriate number of digits in the counter
        * or have a flag for zero-padding in the script itself, with the human having to catch these folders when they exist (which should be relatively rare and relatively easy to anticipate [i.e. timelapses, jpegs for photogrammetry, computer-generated stills, etc])


Questions still remain about capitalization schemes and 


## REFERENCE

YYYYMMDD.location.000counter_Client.Project.EventType_camera.id.stream.000counter.ext


YYYYMMDD.location.000counter_
Client.Project.EventType_
camera.id.stream.000counter.ext