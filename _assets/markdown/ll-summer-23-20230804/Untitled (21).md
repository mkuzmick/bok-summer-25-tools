
here is the routing path: `camera > converter > extension SDI > snake > HUB A > ATEM > HUB B > snake > extension SDI > converter > TV`

snake positions are on the steel trussing attached to the ceiling, at the junction closest to the server room, and by the left side of the green screen. They are indicated by cables labeled with `A##` or `B##`

The challenge is to exaust all possible troubleshooting stages before asking for help. 

### The steps

* set up 2 cameras
    * both 4k Studio cams, through an ethernet converter
    * audio into one of them(set to both channels)
    * medium and close-up, one lens must be at least half the length of the other
* add one computer input(laptop)
* set up 2 TVs
    * have the wide shot and the laptop feed show up on each TV, respectively
* add audio monitoring to the brick room(wait for Jessi)
* set up PA system(wait for Jessi)
* 2 softboxes, one key, one hair
* make a specific decision about how you want the background to look
* match the framing as closely as possible to this one

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05BS1K4RRB/20230608_lookbook.music-studio-corner.1-person.table-podcasting-mic.jpg?pub_secret=2106866a23)

### The details

* ATEM output 11(a8k.11) is always Mix Effects(program) 1
* ATEM output 12(a8k.12) is always Mix Effects(program) 2
* ATEM output 13(a8k.13) is always Mix Effects(program) 3
* ATEM output 14(a8k.14) is always Mix Effects(program) 4
* Make sure that Hyperdeck 1 and 2(the 3rd and 4th up from the bottom of the rack) are set up to record
* Make sure the audio you're inputting is recording on both Hyperdeck channels
* snake cables are labeled like this: `typed is the UID, handwritten is the cable length, and markers that start with A or B are indicating the input or output of the system`
* Do not route cameras directly into TVs, make sure each TV is getting a program feed, and each camera is selected on that program feed.

### The resources

[VideoHub Manual](https://documents.blackmagicdesign.com/UserManuals/Videohub12GInstallation.pdf?_v=1680591612000)

[ATEM Constellation 8k Manual](https://www.bhphotovideo.com/lit_files/594728.pdf)

