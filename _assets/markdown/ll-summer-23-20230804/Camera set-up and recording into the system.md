# Camera set-up and recording into the system

## What you'll need:
- However many Blackmagic cameras you'll be using
- a converter for each camera
- 5 foot ground power cable for each converter
- an ethernet cable for each camera
- an SSD drive per camera

**if not recording into the system:**

- a switcher
- an SDI cable per converter (cam out from the convertor into port 1-8 of switcher)
- a computer with ATEM software
- SDS drive per camera

## Powering the camera

1. Power the converters with basic ground power

***For the following steps, we recommend doing one camera at a time:***

2.  Connect converter to a camera using an ethernet cable (in the converter, plug into the 'camera' port) 
3.  Check if the connection works by looking at the screen on the converter. If it says 'no cam', try the following:
    - press menu, monitor, turn clean feed on
    - if not still, try turning off and on again (sometimes need to turn it on after connected camera)
    - jiggle all the cords if still not working, keep plugging and plugging back in until "NO CAM" reads "STANDBY"

4. Make sure the camera body and camera settings have the same number
    - go to settings -> setup -> ATEM camera ID
    - if you need a new number on the body, they are currently in the top drawer of the blue cart

> Note: later you will need to change the number in the ATEM system

## Recording direct to drive

> You should only be recording directly onto a drive if you are recording at a location outside of the main studio (eg. glass studio) or if you are recording in the small studio seperately from what is going on in the main studio. 

1. Plug convertors into a single switcher using an SDI cable (some switchers need HDMI cables)
2. Plug drive into a switcher 
3. Plug switcher into a computer to run the ATEM software 


## Recording from the system

1. Connect the camera to Hub 1 
      - connect one of the RGB SDI *input* cables that are snaked into the main studio from Hub #1 (in the control room) to the converter port "camera out 1"

2. Switch camera number in Hub 1:
    - check which SDI assigned cable # you used in the last step (the number is near the end of the cable)
    - in the ATEM system, go into video hub control, switch to hub 1
    - you'll notice three coloumns - in the furthest left coloumn, find your camera #
    - in the second coloumn of that #, select the assigned SDI cable # 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05FXGFM015/screen_shot_2023-07-10_at_3.52.26_pm.png?pub_secret=2d2e34853f)

*note: each of the SDIs snaked in from the control room have two pieces of tape on them. the white tape will have the length (written) and unique identifier (printed) while the colored tape will have the cable # we have assigned*

3. Connect Hub 2 to the camera (closing the loop)

    - connect one of the orange/purple SDI *output* cables that are snaked into the main studio from Hub #2 (in the control room) to the convertor port "return 1"

*note: if you have a distribution box, you can connect one orange/purple SDI output cable to that, and connect the distribution box to the converter using an SDI to SDI cable*

4. Check your work by going into the ATEM software and changing the camera controls in the ATEM 
    - go to camera tab at bottom, choose the CAM number you are controlling, then adjust something

5. Then go to back to Video Hub Control, switch to Hub 2 and make sure the output cable (orange) is connected to 8K


6. Start recording! 
    - Make sure the cameras you want recorded are recoding under one of the Mix Effects (1-4)
        - You can switch these in the ATEM system
    - Insert an SSD drive into the hyperdeck you want to record one 
        - there are 4 hyperdecks, 1-4 from the bottom 
        - Usually the ME # will correspond to the hyperdeck #
    - press the record button on the hyperdecks!