---
tags: mk, code
---

# mk-studio-code


## methods and moves

- atem
    -  atem-xml
        - define macros
        - upstream keyers for all 4 M/E
        - downstream keys for all 4
        - supersources
        - 
    - atem-connection
        - deployed
            - switch
            - sync to clock
            - play macro (one of 5)
        - to deploy
            - record?
            - playback?
            - set camera settings 
                - normalize at beginning of day
                - grab frames and do so programmatically?
                - achieve grades for a purpose during demos
            - get macros (and send to slack?)
            - play macro (any arbitrary)
            - define macro
- hyperdeck telnet protocol
- videohub telnet protocol
- 
- multiple devices
    - commands to one atem, then another
    - atems feeding each other to create more complex keys
    - graphics on a dedicated DSK graphics machine?
    - backgrounds on dedicated background machine
    - interact with OBS?
    - instant replay
    - replay of replay
    - 

## hyperdecks

`nc ip.ip.ip.ip 9993`
`remote: enable: true ↵`
`record`
`stop`
`play`
`clips get`

```
playrange set: in: 00:00:16:00 out: 00:00:21:00
play: speed:50
```

note: set `timecode output: clip`



### sample workflow

- record (while NOT routing the feed from the hyperdeck to the TV)
- stop, play . . . switch so TV gets audio from hyperdeck (but nowhere else)


### instant replay concept

- two hypers
    - hyper.a
    - hyper.b
- initially
    - hyper.a receives PGM1
    - hyper.b dormant
- request for replay hits
    - hyper.b starts
    - hyper.a stops
    - hyper.a queues to timecode requested
    - atem switches to hyper.a playback audio ONLY
        - pan to one side?
    - atem sends audio at this point (mix minus?)
    - hyper.a play (with speed requested)
    - atem switches to display hyper.a on PGM1
    - somehow audio hits speakers and condensers are cut
    - 


## docs

- documentation on [atem-connection methods](https://nrkno.github.io/sofie-atem-connection/classes/Atem.html#changeProgramInput)



![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F042SQWS0E9/screen_shot_2022-09-18_at_11.29.23_am.png?pub_secret=454c08d6ea)



## to do

### macros

looking like this may be the only way to access cameras . . . also a good way to access everything else.

#### determine macro upload/download structure
do the first and then the second:

```
public async downloadMacro(index: number): Promise<Buffer> {
    return this.dataTransferManager.downloadMacro(index)
}
public async uploadMacro(index: number, name: string, data: Buffer): Promise<void> {
    return this.dataTransferManager.uploadMacro(index, data, name)
}

```

#### can you restore with code?

is there a method for restoring the ATEM based on an XML?