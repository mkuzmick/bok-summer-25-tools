---
tags: checklists
---

# MPA Checklists

Questions: 
* If we're running the audio through the cameras, do we want to make sure any cameras that aren't receiving a mic, are set to in-camera mics(so that we can sync isos)
* do overheads need to be matched at the beginning of each day? each shoot? can this be automated?
* 

## Studio startup
- **Control Room**
    - *to do*
        - [ ] power on the rack, top and bottom
        - [ ] restore a4k and a8k
        - [ ] SSDs into all Hyperdecks and format them
        - [ ] turn on multiview monitors
    - *to check*
        - [ ] are there any audio feeds(on the Zoom L12) showing ghost signals? 
            - [ ] reset them by pushing the slider all the way up and back to it's position
        - [ ] are all front on cameras on, focussed and properly exposed?
        - [ ] are all overheads on, focussed and properly exposed?
        - [ ] is the chroma key working?
        - [ ] is the ultrastudio working?
            - [ ] are both Mac Studios logged in and working?
        - [ ] are the speakers in the control room receiving audio?
        - [ ] are all the monitors on?
            - [ ] including the weird one that requires you select the input manually
        - [ ] is the main table audio enabled and functioning?
        - [ ] is the control room clean and all tables clear/organized?
- **Studio**
    - *to do*
        - [ ] power on switched power strips(2) at corners of main truss - tables 1&2
        - [ ] power on stage lights(3)
        - [ ] turn on all tvs/projectors(9)
        - [ ] turn on the PA
    - *to check*
        - [ ] are the stage mics working?
        - [ ] are all tables clean? 
        - [ ] are all cables/lenses/caps/gear put away?
        - [ ] did all cameras turn on properly?
        - [ ] is the main table iMac hooked up to the system?
        - [ ] are the ladders stowed away?
- **Small studio**
    - *to do*
        - [ ] power on the strip under the cameras
        - [ ] turn on the shogun studio
        - [ ] turn on the strip under the confidence monitors
        - [ ] plug in the back light
        - [ ] turn on the overhead camera
        - [ ] power on both tvs and select input on bottom one
        - [ ] plug a fresh sdx into the amx
        - [ ] log into the laptop and restore the ATEM 
        - [ ] check that the audio is coming through 
    - *to check*
        - [ ] is the wide shot showing on the top tv/overhead on the bottom? 
        - [ ] are the lights in the correct position?
        - [ ] is the table properly framed in the wide shot?
        - [ ] are the overhead lights on? turn them off

## End of Day Shut Down
**As with any device, please make sure all recording has stopped before cutting power to it.**
- **Control Room**
    - *to do*
        - [ ] shut off the rack, top and bottom
        - [ ] check all drives in Hyperdecks
            - [ ] if empty, leave them
            - [ ] if they have media on them, pass them off to be ingested
        - [ ] turn off lights
        - [ ] *leave the mac minis on*
    - *to check*
        - [ ] are all tables cleaned/organized? 
        - [ ] did all the tvs shut down properly? 
- **Studio**
    - *to do*
        - [ ] turn off switched power strips at table 1 and table 2(on the truss corners nearest the center of the room)
        - [ ] turn off the green screen key and back lights
        - [ ] make sure any cameras on dollies are turned off
            - [ ] make sure any SD cards in these cams are removed, if there is media on them -- label and place in ingest bin
    - *to check*
        - [ ] is there any gear left over on the tables that can be put away?
        - [ ] are all tables clean?
        - [ ] are all lights shut off?
        - [ ] are any tvs/monitors still showing a live feed?
- **Small Studio**
    - *to do*
        - [ ] turn off the switched power strip below the cameras 
        - [ ] turn off the switched power strip on the floor, below the tvs
        - [ ] pull the back light's power from the wall
        - [ ] turn off the overhead camera
    - *to check*
        - [ ] is there an sdx still attached to the switcher?
            - [ ] is there media on the drive? 
                - [ ] if so, name it and hand it off for ingest
                - [ ] if not, leave it
        - [ ] is the overhead camera still on?(this is the most frequently left on camera in the studio)

# Shoot Checklists
**There should always be a person that has some kind of details about any given shoot, find that person first to collect details**(most of the time Casey or Dani will either have those details, or know who will). Treat every shoot as "non-standard" to start and assume that nothing is ready to record. 

### Media Guide
[You can find a walkthrough of SD card protocols here](https://www.sdcard.org/developers/sd-standard-overview/speed-class/)
* Hyperdecks and Shoguns use unenclosed SSDs
* ATEM Mini Extreme ISO switchers(amx) use Sandisk Extreme SSDs with a USB-c cable
* C200s use U3/v30 SD cards -- *slower cards will still work, but they will likely shut off midway through recording, if it is in 4k*
* C300s use any CF cards(do not mix these up with CFast cards!)
* C100s use any SD card
* Canon 5Ds and 6Ds use any class 10, U1 card or faster
* Any other DSLR can use class 10 or faster
* the ZCam uses a dedicated external SSD, or CFast cards(do not mix these up with CF cards!)

- **Studio**
    - *to do*
        - [ ] load the recorders up with media 
        - [ ] format all media that is ready to record
        - [ ] check that all batteries have enough charge to last longer than the shoot
            - [ ] if the batteries are fresh and still not long enough, have extras on hand
        - [ ] turn on the lights
        - [ ] ensure that every feed, that needs one, has a mic input
            - [ ] amx and Hyperdeck recordings don't need extra mics
            - [ ] C200/C300/C100 all need an external mic to sync the footage
    - *to check*
        - [ ] do you need the PA system? 
            - [ ] if so, is it on and working?
        - [ ] is the correct mic input enabled in the a8k/a4k?
        - [ ] is your shot level/squared
        - [ ] are the mics an appropriate distance from their subjects?
        - [ ] is your close up appropriately different from your wide(half the zoom length, or at least 30 degrees of difference)
        - [ ] is your lighting ratio appropriate for your content?
        - [ ] is your framing appropriate for your content?
        - [ ] are you using mixed lighting when you don't need to?
        - [ ] is your subject properly exposed?
        - [ ] is your subject in focus?
- **Small Studio**
    - *to do*
        - [ ] hook up an sdx for recording
        - [ ] adjust mics to be as close as possible(without being in the wide shot)
        - [ ] frame the overhead for your subject's content
    - *to check*
        - [ ] are the mics enabled for Cam 1?
        - [ ] are both confidence monitors working?
        - [ ] are all cameras in focus?
        - [ ] did it begin recording properly?
        - [ ] how does the audio sound?
- **Podcasting**
    - *to do*
        - [ ] hook the appropriate number of mics(preferably dynamics) into an audio interface
        - [ ] set up headphones, with a splitter, into the monitor
        - [ ] make sure your headphone volume is an appropriate level
        - [ ] set each track to record per microphone
        - [ ] if they're using a field recorder, is it wall powered? 
            - [ ] if not, does it have enough batteries to run phantom power for the duration of the recording?
    - *to check*
        - [ ] is each mic getting an active feed?
        - [ ] does the mic you have plugged in require phantom power
        - [ ] is each input set at the right level for a normal speaking voice?