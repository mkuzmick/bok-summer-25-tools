# resource-resolve-video-to-stills-workflow

Just some quick instructions on creating stills with sourcefile and timecode-based names using Resolve and node.

## the goal

To 
1. select frames from videos within Resolve
2. color grade them in resolve if desired
3. export them
4. rename them according to a `SOURCE_FILENAME_TIMECODE.png` naming convention. We may add a counter or a reference to the clipname in the Resolve timeline to distinguish between multiple iterations of the same shot


## in resolve

- work in the main database
- create a new project in the stills folder for the shoot you are processing


### dani (very incomplete) notes
- keys j k l can be used - j for going backwards, l for going forward, and k stops (and pressing j or l continuously can speed up)
- I (in) O (out) the same spot to grab a still
- F9 or create your own shortcut like E 
- when rendering- click suffix, not prefix


if exported the right way, this is the script that will work on machines that have the `ll-studio-bot` installed:

```
lls --v2s /path/to/the/folder
```