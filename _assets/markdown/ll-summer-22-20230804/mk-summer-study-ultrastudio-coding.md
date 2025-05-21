---
tags: mk
---


# mk-summer-study-ultrastudio-coding

link to the [macadam](https://github.com/Streampunk/macadam) library and sample code.

## ffmpeg clues


post on [growing files](https://stackoverflow.com/questions/64243094/ffmpeg-growing-input-files)

```
ffmpeg -i "y:\3000012936-TXMHD.mxf" -vcodec copy -acodec copy -f mpegts pipe:1 | ffmpeg -re -i pipe:0 -pix_fmt yuv420p -vsync 1 -map 0:v:0 -map 0:a:0 -c:a aac -c:v libx264 -use_template 1 -use_timeline 1 -init_seg_name  "init-stream$RepresentationID$-$Bandwidth$.mp4" -media_seg_name "chunk-stream$RepresentationID$-$Number%05d$.$ext$" -b:v 1500k -b:a 128k -ac 2 -profile:v main -level:v 3.0  -s 1920x1080 -r 25 -vsync passthrough -increment_tc 1 -adaptation_sets "id=0,streams=v id=1,streams=a" -g 100 -keyint_min 100 -seg_duration 5 -frag_duration 5  -dash_segment_type auto -f dash  "stream.mpd"
```

[post on capture in the ffmpeg docs](https://trac.ffmpeg.org/wiki/Capture/Blackmagic)

we may need to try this on the windows machine

```
ffmpeg -list_devices true -f dshow -i dummy
```

or for mac

```
ffmpeg -list_devices true -f avfoundation -i dummy
```

```
ffmpeg -list_options true -f avfoundation -i video="Blackmagic UltraStudio 4K Extreme 3"
```

