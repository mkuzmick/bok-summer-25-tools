# microproject-test-strip


from [this link](https://superuser.com/questions/625189/combine-multiple-images-to-form-a-strip-of-images-ffmpeg)

### imagemagick

`montage [0-4].png -tile 5x1 -geometry +0+0 out.png`

`convert sepimage-0.png sepimage-1.png sepimage-2.png -channel RGB \
-combine imagecopy.png`

### ffmpeg

`ffmpeg -i input.jpg -i input.jpg -i input.jpg -filter_complex "[0][1][2]hstack=inputs=3" -vframes 1 output.jpg`

vertical stack
`ffmpeg -i input0 -i input1 -filter_complex vstack=inputs=2 output`

horizontal stack
`ffmpeg -i input0 -i input1 -filter_complex hstack=inputs=2 output`

3 videos
`ffmpeg -i input0 -i input1 -i input2 -filter_complex "[0:v][1:v][2:v]hstack=inputs=3[v]" -map "[v]" output`

2x2 grid
`ffmpeg -i input0 -i input1 -i input2 -i input3 -filter_complex "[0:v][1:v][2:v][3:v]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0[v]" -map "[v]" output`

h-stack and v-stack together
`ffmpeg -i input0 -i input1 -i input2 -i input3 -filter_complex "[0:v][1:v]hstack=inputs=2[top];[2:v][3:v]hstack=inputs=2[bottom];[top][bottom]vstack=inputs=2[v]" -map "[v]" output`

2x2 grid with text
```
ffmpeg -i input0 -i input1 -i input2 -i input3 -filter_complex
"[0]drawtext=text='vid0':fontsize=20:x=(w-text_w)/2:y=(h-text_h)/2[v0];
 [1]drawtext=text='vid1':fontsize=20:x=(w-text_w)/2:y=(h-text_h)/2[v1];
 [2]drawtext=text='vid2':fontsize=20:x=(w-text_w)/2:y=(h-text_h)/2[v2];
 [3]drawtext=text='vid3':fontsize=20:x=(w-text_w)/2:y=(h-text_h)/2[v3];
 [v0][v1][v2][v3]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0[v]"
-map "[v]" output
```

4x4 x-stack
```
ffmpeg -i input0 -i input1 -i input2 -i input3 -i input4 -i input5 -i input6 -i input7 -i input8 -i input9 -i input10 -i input11 -i input12 -i input13 -i input14 -i input15 -i input16 -filter_complex "[0:v][1:v][2:v][3:v][4:v][5:v][6:v][7:v][8:v][9:v][10:v][11:v][12:v][13:v][14:v][15:v]xstack=inputs=16:layout=0_0|w0_0|w0+w1_0|w0+w1+w2_0|0_h0|w4_h0|w4+w5_h0|w4+w5+w6_h0|0_h0+h4|w8_h0+h4|w8+w9_h0+h4|w8+w9+w10_h0+h4|0_h0+h4+h8|w12_h0+h4+h8|w12+w13_h0+h4+h8|w12+w13+w14_h0+h4+h8" output.mp4
```

4x4 x-stack with scaling
```
ffmpeg -i input0 -i input1 -i input2 -i input3 -i input4 -i input5 -i input6 -i input7 -i input8 -i input9 -i input10 -i input11 -i input12 -i input13 -i input14 -i input15 -i input16 -filter_complex "[0:v]scale=iw/4:-1[v0];[1:v]scale=iw/4:-1[v1];[2:v]scale=iw/4:-1[v2];[3:v]scale=iw/4:-1[v3];[4:v]scale=iw/4:-1[v4];[5:v]scale=iw/4:-1[v5];[6:v]scale=iw/4:-1[v6];[7:v]scale=iw/4:-1[v7];[8:v]scale=iw/4:-1[v8];[9:v]scale=iw/4:-1[v9];[10:v]scale=iw/4:-1[v10];[11:v]scale=iw/4:-1[v11];[12:v]scale=iw/4:-1[v12];[13:v]scale=iw/4:-1[v13];[14:v]scale=iw/4:-1[v14];[15:v]scale=iw/4:-1[v15];[v0][v1][v2][v3][v4][v5][v6][v7][v8][v9][v10][v11][v12][v13][v14][v15]xstack=inputs=16:layout=0_0|w0_0|w0+w1_0|w0+w1+w2_0|0_h0|w4_h0|w4+w5_h0|w4+w5+w6_h0|0_h0+h4|w8_h0+h4|w8+w9_h0+h4|w8+w9+w10_h0+h4|0_h0+h4+h8|w12_h0+h4+h8|w12+w13_h0+h4+h8|w12+w13+w14_h0+h4+h8" output.mp4
```

scaling
```
ffmpeg -i input0 -i input2 -filter_complex "[0:v]scale=640:-1[v0];[v0][1:v]vstack=inputs=2" output
```

cropping first?
```
ffmpeg -i 1.mp4 -i 2.mp4 -filter_complex "[0:v]crop=iw:640[v0];[1:v]crop=iw:ih/2[v1];[v0][v1]vstack" -c:v libx264 -crf 23 -preset veryfast output.mp4
```

```
#! /bin/sh
pref="`basename $0 .sh`"
inf="Pexels_flowers.mp4"  # 1920x1080

#
ffmpeg -y -i "${inf}" -filter_complex "
[0:v]crop='iw:ih/2:0:0'[vo];
[0:v]crop='iw:ih/2:0:ih/2',swapuv[vf];
[vo][vf]vstack[v]
" -map '[v]' -an \
  "${pref}.mp4"
```

using tile filter
```
ffmpeg -i %03d.png -filter_complex "scale=120:-1,tile=5x1" output.png
```