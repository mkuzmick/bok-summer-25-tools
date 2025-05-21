# project-peakgif-machine

## plan 

- generate csv of levels
- transform into object containing frame values too
- or have
    - obj
        - vframerate
        - aframerate
        - width
        - height
        - audioData: []
        - smoothPeak: in seconds
        - peakAudioFrames:
        - peakVideoFrames:
        - peakTimecode: 
        - audioPeak: (smoothPeak - 1sec)
        - peakStill: 
        - peakGifStart:
        - peak of smoothed array (moment 1 second offset if nothing else changed)
- smooth the array with 2-second moving average
- find max frame
- find camera and have custom filters for each location?
- have slack listen for filter requests---or text/caption requests
- 


## references and notes


normalize

`normalize=blackpt=black:whitept=white:smoothing=50:independence=0`

curves

`ffmpeg -i input.vid -vf "curves=all='0/0 0.5/1 1/1'" -codec:a copy -codec:v libx264 -y output.vid`

eq

`ffplay -vf eq=gamma=1.5:saturation=1.3 original.vid 

# render
ffmpeg -i original.vid -vf eq=gamma=1.5:saturation=1.3 \
    -c:a copy  outfile.vid`


```
ffmpeg -ss 5037.165510727297 -i /Volumes/10_01/_footage/2022_06/24/20220624.0.001_LL.SummerSystem.Planning/hyper.a.h264/20220624.0.001_LL.SummerSystem.Planning_hyper.a.h264.0001.mp4 -t 2.0 -y -pix_fmt yuv420p -vf "pp=al, normalize=blackpt=black:whitept=white:smoothing=50:independence=0" /Volumes/_resolve/_exports/_peakgifs/20220624.0.001_LL.SummerSystem.Planning_hyper.a.h264.0001_segment.mov
```


some references

```
ffmpeg -i in.mp3 -af astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=log.txt -f null -
```

```
ffmpeg -i mywav.wav 

-af asetnsamples=44100,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=log.txt
```


```
ffmpeg -af 
```

ffmpeg -t 10 -i "/Users/mk/Desktop/zkcddd.mov" -af "volumedetect" -f 

null /dev/null


ffmpeg -i "/Users/mk/Desktop/20220512.0.001_TDM90DR.HDPInterview.Recording_hyper.b.h264.0001.mp4" -ss 00:05:00 -t 00:05:00 -af "volumedetect" -f null /dev/null


ffprobe -i "/Users/mk/Desktop/20220512.0.001_TDM90DR.HDPInterview.Recording_hyper.b.h264.0001.mp4" -af asetnsamples=44100,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file="/Users/mk/Desktop/log.txt"


this works:
```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level -of csv=p=0


ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level -of csv=p=0



```

now every second
```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=24 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level -of csv=p=0 1> /Users/mk/Development/ll-studio-bot/_temp/out.txt 2> /Users/mk/Development/ll-studio-bot/_temp/err.txt
```

```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level,lavfi.astats.1.RMS_level,lavfi.astats.2.RMS_level -of csv=p=0 

# 1> /Users/mk/Desktop/every-frame.txt


ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level,lavfi.astats.1.RMS_level,lavfi.astats.2.RMS_level -of csv=p=0 



```

https://superuser.com/questions/1183663/determining-audio-level-peaks-with-ffmpeg




```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/zkcddd.mov,astats=metadata=1:reset=1  frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level,lavfi.astats.1.RMS_level,lavfi.astats.2.RMS_level -of csv=p=0 1> /Users/mk/Desktop/every-frame.txt
```




/Users/mk/Desktop/20220512.0.001_TDM90DR.HDPInterview.Recording_hyper.b.h264.0001.mp4

```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/20220512.0.001_TDM90DR.HDPInterview.Recording_hyper.b.h264.0001.mp4,astats=metadata=1:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level,lavfi.astats.1.RMS_level,lavfi.astats.2.RMS_level -of csv=p=0 1> /Users/mk/Desktop/every-frame.txt
```

https://ottverse.com/ffprobe-comprehensive-tutorial-with-examples/#Per-Frame_information_using_ffprobe


ffmpeg -i in.mp3 -af as

ffmpeg -i /Users/mk/Desktop/zkcddd.mov -af astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=/Users/mk/Development/ll-studio-bot/_temp/out-5.txt -f null -



```
ffprobe -f lavfi -i amovie=/Users/mk/Desktop/20220512.0.001_TDM90DR.HDPInterview.Recording_hyper.b.h264.0001.mp4,astats=metadata=print:reset=1 -show_entries   frame=pkt_pts_time:frame_tags=lavfi.astats.Overall.RMS_level,lavfi.astats.1.RMS_level,lavfi.astats.2.RMS_level -of csv=p=0 1> /Users/mk/Desktop/every-frame.txt
```



ffmpeg -i loudSoft.mp3 -af astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=- 2> result.txt


ffprobe -v quiet -f lavfi -print_format json -i "movie=test.mp4" -show_frames -show_entries frame=pkt_pts_time





### python options

https://github.com/slhck/ffmpeg-normalize

