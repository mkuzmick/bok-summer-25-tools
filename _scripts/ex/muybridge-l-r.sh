#!/bin/bash

# Check if two file paths are provided
if [ $# -lt 2 ]; then
  echo "Usage: $0 video_file_path frames_between_images"
  exit 1
fi

# Set the input and output file paths
input_file=$1
output_dir=$(dirname $input_file)
output_base=$(basename -s .m4v $input_file)
output_prefix="${output_dir}/${output_base}_frame_"
output_file="${output_dir}/${output_base}.jpg"

# Set the frames between images
frames_between_images=$2

# Use FFmpeg to extract every nth frame
ffmpeg -i $input_file -vf "select=not(mod(n\,${frames_between_images})),scale=-1:480" -vsync vfr -q:v 2 $output_prefix%03d.jpg

# Use ImageMagick to combine the frames into a single image
montage -tile x1 -geometry +0+0 "${output_prefix}"*.jpg -resize 480x "${output_file}"

# Remove the individual frame files
# rm "${output_prefix}"*.jpg
