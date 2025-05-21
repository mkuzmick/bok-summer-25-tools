# camera & interview set up

### Video:

What you'll need:
- However many Blackmagic cameras you'll be using
- a converter for each camera
- 5 foot ground power cable for each converter
- an ethernet cable for each camera

**Step 1.** Rename the Blackmagic cameras in 2 places:
- On the body of the camera itself 
    - the numbers are currently in the top drawer of the blue cart 
- In the camera settings
    - Go to settings -> setup -> ATEM camera ID

> Note: later you will need to change the number in the ATEM system, but you won't be able to do that until you know which input SDI cord you are using

**Step 2.** Set up the converters - one for each camera

- Power the converters with basic ground power

***For the following steps, we recommend doing one camera at a time:***

**Step 3.** Connect a converter to a camera using an ethernet cable (in the converter, plug into the 'camera' port) 

- Check if the connection works by looking at the screen on the converter. If it says 'no cam', try the following:
    - press menu, monitor, turn clean feed on
    - if not still, try turning off and on again (sometimes need to turn it on after connected camera)
    - jiggle all the cords if still not working, keep plugging and plugging back in

**Step 4.** Connect the camera to Hub 1 (through the converter) using one of the RGB SDI *input* cables that are snaked into the main studio from Hub #1 (in the control room). 
- plug into the port on the converter that says "camera out 1" 

**Step 5.** Switch camera number in the hub:
- check which SDI cable # you used in the last step (the number is near the end of the cable)
- in the atem system, go into video hub control, switch to hub one
- you'll notice two coloumns - in the left hand coloumn, select the SDI cable # under whichever number camera you connected it to

**Step 6.** Connect Hub 2 to the camera (through the converter) using one of the orange/purple SDI *output* cables that are snaked into the main studio from Hub #2 (in the control room).

- plug into the port on the converter that says "return 1"
- or if you have a distribution box, you can connect one orange/purple SDI *output* cable to that, and connect the distribution box to the converter using an SDI to SDI cable

check that this worked (you can control from the ATEM) by changing the camera controls in the ATEM (go to camera tab at bottom, choose the CAM number you are controlling, then adjust soemthing)
- Then go to Hub 2 and make sure the output cable (oramge) is connected to 8K










_______________


ethernet cables can provide camera control, can recieve video feed, and power. What it cannot do is plug into a screen. the converter will help do this. 

Cannon does not take ethernet, needs SDI

SDI cable can connect a cannon camera to the television for video. SDI is specifically for AV production. The SDI can also lock in place. The ethernet is not made to handle a lot of movement, a bit jankier

Right now the different studios (main, small, glass) can run on their own without connecting to the

SDI to HDMI is how we connect camera to screen

pro video is SDI
commercial is HDMI 









