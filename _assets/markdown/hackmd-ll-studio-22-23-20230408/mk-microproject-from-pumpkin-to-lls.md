---
tags: mk
---

# mk-microproject-from-pumpkin-to-lls

## next steps

- `noBotMessages` middleware function on all message-handlers (put in `/ll-slack-tools`)
- save stills to Airtable
- send Markdown back as before
- process stills with `cr2ToJpegPreview` (put in `/ll-image-tools`)
- cli tool to handle folder
    - on firing script
    - on watch-folder events
- tagging interface (in Airtable and in Slack)
- app home with my-most-recent-stills
- get all blackmagic device info
    - ATEM
    - hub
    - hyperdecks
- atemSync
    - 4k
    - 8k
    - amx
- Airtable
    - raw stills table
    - edited stills table
    - show-your-work connections
- paper
    - print-task connections

## future steps

- voting and other interactions on slack
- other APIs to integrate
    - flickr
    - hackmd
    - lens studio
    - social platforms?
    - canvas
    - 

## questions

- if amxs.a gets clean feeds of all studio cams before the switcher, what timecode does it receive?
- of c200s are recorded to cards or through clean feeds from hub, how do we reconcile timecode?


## notes and documentation

### cli preview generator

- grab filepath and create still objects
- `/Users/mk/Development/_sample-media/21/20221021.7.001_LL.DesignLab.Study`
- loop through still objects and 
    - get metadata
    - generate previews
    - send to Slack
    - generate Airtable record with
        - filename
        - metadata (as JSON for now)
        - preview as attachment
        - location of full-res file
        - slack link
        - tags?
        - caption placeholder
        - title placeholder


#### stills conversion

reference

```
# Assuming your have installed the following:
#
# brew install ufraw imagick ffmpeg
# apt-get install ufraw imagick ffmpeg

# Convert to JPG's
for img in *.CR2; do convert -resize 1920 "$img" "$img.jpg"; print "$img"; done

# Make a video
ffmpeg -framerate 8 -i IMG_%04d.CR2.jpg -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" out.mp4
# -framerate 8 means 8 images a second while 1/5 means each image lasts 5 seconds
# -fv scale http://stackoverflow.com/a/20848224/99923
```


Note that as of ImageMagick 6.4.7-0, -normalize is equivalent to ``-contrast-stretch 2%x1%``. (Before this version, it was equivalent to -contrast-stretch 2%x99%).

`-contrast-stretch 0.15x0.05%`

`-contrast-stretch 2%x1%`
`-contrast-stretch 4%x3%`

```
convert -resize 1920 -normalize -quality 70% "/Volumes/ll_spacegray_storage/20221021.7.001_LL.DesignLab.Study_6d.b.stills.0005.CR2" "/Volumes/ll_spacegray_storage/20221021.7.001_LL.DesignLab.Study_6d.b.stills.0005.CR2-4.jpg"```
```


```
convert -resize 1920  -quality 70% -contrast-stretch 0.01%x0.01% "/Volumes/ll_spacegray_storage/20221021.7.001_LL.DesignLab.Study/6d.a.stills/20221021.7.001_LL.DesignLab.Study_6d.a.stills.0008.CR2" "/Volumes/ll_spacegray_storage/output-.01.01.jpg"

```

/Volumes/ll_spacegray_storage/20221021.7.001_LL.DesignLab.Study/6d.a.stills/20221021.7.001_LL.DesignLab.Study_6d.a.stills.0008.CR2



![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F048EB8THKR/red-truss.jpg?pub_secret=058a10cf2f)


