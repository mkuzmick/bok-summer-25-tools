# mk-microproject-muybridge-script

```
#!/bin/bash

# Check if at least one file path is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 video_file_path [frames_between_images] [max_images]"
  exit 1
fi

# Set the input and output file paths
input_file=$1
output_dir=$(dirname "$input_file")
output_base=$(basename "$input_file")
output_base="${output_base%.*}"
output_prefix="${output_dir}/${output_base}_frame_"
output_file="${output_dir}/${output_base}.jpg"

# Set the frames between images (default to 1 image per second)
if [ $# -lt 2 ]; then
  frames_between_images=24
else
  frames_between_images=$2
fi

# Set the maximum number of images (default to no limit)
if [ $# -lt 3 ]; then
  max_images=
else
  max_images="-vframes $3"
fi

# Use FFmpeg to extract every nth frame
ffmpeg -i "$input_file" -vf "select=not(mod(n\,${frames_between_images})),scale=-1:480" -vsync vfr -q:v 2 $max_images "${output_prefix}%03d.jpg"

# Use ImageMagick to combine the frames into a single image
montage -tile 1x -geometry +0+0 "${output_prefix}"*.jpg -resize x480 "${output_file}"

# Remove the individual frame files
# rm "${output_prefix}"*.jpg
```
