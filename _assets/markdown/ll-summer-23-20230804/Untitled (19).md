## The resources

[VideoHub Manual](https://documents.blackmagicdesign.com/UserManuals/Videohub12GInstallation.pdf?_v=1680591612000)

[ATEM Constellation 8k Manual](https://www.bhphotovideo.com/lit_files/594728.pdf)


here is the routing path: `camera > converter > extension SDI > snake > HUB A > ATEM > HUB B > snake > extension SDI > converter > TV`

snake positions are on the steel trussing attached to the ceiling, at the junction closest to the server room, and by the left side of the green screen. They are indicated by cables labeled with `A##` or `B##`

snake position in the classroom is on top of the shelves, in the middle of the room.

The challenge is to exaust all possible troubleshooting stages before asking for help. 

### The steps

* set up 4 cameras, 2(close/medium) in the studio and 2(close/medium) in the classroom
	* each will have one feed piped into the other location
		* the talent in the classroom will see the program feed from the studio and vice versa
		* the idea is for these two to be able to talk to one another, and control what each other sees and hears
		* each person on camera should have an ATEM mini extreme(amx)
			* each amx should receive both camera feeds and a computer feed
		* each camera should send HDMI out to the amx and ethernet-to-SDI back to the Videohub
		* each amx should also receive a computer feed.
* the Videohub should receive: 
	* the program out of each amx
	* the wide shot from each setup
	* the close-up shot from each setup 
* the Hyperdecks should receive: 
	* the program out of each amx
	* the wideshot from each setup
* each location should have 2 confidence monitors
	* 1 should receive a feed from the opposite room
	* 1 should receive a feed from an ATEM mini 
* each camera will need a dynamic interview mic
	* this mic will need to be split at each location
		* one split will go into the camera
		* the other split will be sent to a PA in the opposite room
* each location will require a typical 2 softbox lighting setup
	* key and hair lights
* each PA should receive a mic input and an audio interface output from each laptop. 
* each shot should be of someone at a table, on a stool
* accent lights on the background(pancake LEDs)
* shoot at 2.8 or wider on all 4 cameras
#### Studio
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05JKC1LVEH/screenshot_2023-07-25_at_9.56.08_am.png?pub_secret=42fc062122)

#### Classroom
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05JNAFGAFM/screenshot_2023-07-25_at_10.12.21_am.png?pub_secret=8170f2a5e2)

### The details

* ATEM output 11(a8k.11) is always Mix Effects(program) 1
* ATEM output 12(a8k.12) is always Mix Effects(program) 2
* ATEM output 13(a8k.13) is always Mix Effects(program) 3
* ATEM output 14(a8k.14) is always Mix Effects(program) 4
* Make sure that Hyperdeck 1 and 2(the 3rd and 4th up from the bottom of the rack) are set up to record
* Make sure the audio you're inputting is recording on both Hyperdeck channels
* snake cables are labeled like this: `typed is the UID, handwritten is the cable length, and markers that start with A or B are indicating the input or output of the system`
* Do not route cameras directly into TVs, make sure each TV is getting a program feed, and each camera is selected on that program feed.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05K3EHMV6D/img_3335.jpg?pub_secret=482c2f27b1)



