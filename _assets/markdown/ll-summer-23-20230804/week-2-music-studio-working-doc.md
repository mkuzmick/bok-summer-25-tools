# week-2-music-studio-working-doc

## concepts
* source to system/signal flows
* inputs and outputs
* the machines
    * converter
    * switcher
    * videohub

## gear
* blackmagic cameras
* converters (1 per camera)
* 1 switcher
* ethernet (1 per camera)
* SDI cables
* pipes (document this!)

## steps
* ethernet into camera
    * power but also data?
* camera to converter
    * grounded power
    * sdi
    * make sure the resolution says 1080p on the converter. if it needs to be changed, make the change on the camera (in "monitor" menu)
* converter to switcher
    * camera outs to SDI inputs
    * set the camera number on the camera
* into the system
    * hub 1
    * atem
    * hub 2
    * screens


## manuals
* [manual for blackmagic 4k studio pro](https://documents.blackmagicdesign.com/UserManuals/BlackmagicStudioCameraManual.pdf)
* [manual for blackmagic studio converter](https://www.lensrentals.com/product-assets/f3667337-1335-4515-b5d9-c4f8d2a5db3b/StudioMonitor.pdf)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F059LHBP05N/screenshot_2023-05-22_at_11.46.05_am.png?pub_secret=813c254bf1)
* [manual for blackmagic ATEM 1 M/E Constellation HD](https://documents.blackmagicdesign.com/UserManuals/ATEM_Constellation_HD_Switchers_Manual.pdf?_v=1658300401000)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F058TTJ50N9/screenshot_2023-05-22_at_11.44.47_am.png?pub_secret=34ae0dd976)