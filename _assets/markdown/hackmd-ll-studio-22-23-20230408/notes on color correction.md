# notes on color correction


## tools for color correction in fcpx
* color board
* wheels: old school, what you see in apps like Resolve; have shadows, midtones, highlights you can effect, color temperature slider
* curves: more fine-tuned than the color board
* hue/saturation curves


color/saturation/exposure
* exposure: can apply it globally to apply it to everything in the frame/so they stay in relation to each other
    * have the waveform open any time you're doing color correction! so you really know where your RGB levels are (and you don't want to blow any of them out!)
    * white point
    * black point
    * gamma (contrast between black and white)
    * goal: something should hit black (0), something should hit white (0), mid should be around 50
* saturation
    * best viewed in vectorscope (plots pixels around color wheel)
    * most hues of human skin are in the wedge between yellow and red (can right click to 'show skintone indicator' - can apply a mask around their face and then select draw mask and then isolate the subject's face - then you'll see whether it's in alignment with the skintone indicator)


note: work with exposure first! (make sure everything is where you want it to be in the image) - and if you bring up exposure you can see what's going on in the vectorscope and then change the colors

## masking and hue saturation effect
*  draw a mask around a part of the frame to apply color correction in a particular place
* then go find the hue saturation effect
    * put hue in the zone of 355 
* go back to color board - get rid of weird saturation
* go back to the waveform and see what's happening with exposure
* dial saturation back
* exposure - try to get it so that red is more around 77 zone (at least in the example we used with Amelie in the small studio)


## color curves
* luma: effects exposure: on right is the white point of the image (blows up the whites in the waveform); left effects the black point
* introduce an S curve to bump whites and blacks up more gradually 
    * get a bit of a slope (to introduce contrast)
* color curves really good for doing weird effects

## hue/saturation curves
* can effect just one color either by clicking dots on the line and clicking up and down
* or can do this by sampling something
* hue v hue will move around the color wheel the color you've sampled (by clicking on the line)

## resources

* [the Zone system (historical system used by photographers)](https://en.wikipedia.org/wiki/Zone_System)
* [apple resource on hue and saturation curves](https://support.apple.com/guide/final-cut-pro/use-hue-and-saturation-curves-ver463347c6b/mac)

---
### Some additions or repetitions: 

#### Color Correction Tools

**• For Color**

Selection board — affect both color saturation and exposure
The circular bar on left shows and adjusts global exposure
If you overdo / blow out the reds, skin and other textures become a *pasty yellow*
Keep the waveform and histogram open
The midtone adjuster keeps black black and white white, but adjusts the central range of color
The gamma, the contrast between the white and black, is more evident in *curves*
Hitting white and hitting black means hitting 100 and 0


**• For Saturation**

Visible in the colorwheel of the vectorscope
Can use the draw mask to select an area to see what the relevant saturation is
Push slightly toward magenta
Can use hue saturation effect – to change the direction, spin of the line
Can use the mask to focus on skin as origin point, and, as you change it, it changes the rest of the image behind it
Do Exposure first then Color then Saturation
Purposefully over-saturating can help see where should put the hue

**• Color Curves**

Luma = exposure / white point
Upper x axis = white point; left side = black point
Using color curves enables several different and more complex effects
If pull the curve invertedly, leads to a negative image, basically
And can make dual tone!


