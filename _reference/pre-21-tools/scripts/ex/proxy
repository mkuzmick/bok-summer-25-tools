#!/bin/bash

# if running in env with no ffmpeg in $PATH
#PATH=/usr/local/bin:$PATH

################
##  SETTINGS  ##
################

CRF_VAL="23"
AUDIO_BITRATE="128k"

####################################
##  FIGURING OUT THE OUTPUT PATH  ##
####################################

INPUT_PATH=$1
EXT="${INPUT_PATH#*.}"
INPUT_NO_EXT="${INPUT_PATH%.$EXT}"
OUPUT_PATH="$INPUT_NO_EXT-proxy.$EXT"

echo "INPUT_PATH is $INPUT_PATH"
echo "EXT is $EXT"
echo "INPUT_NO_EXT is $INPUT_NO_EXT"
echo "OUPUT_PATH is $OUPUT_PATH"

################################
## THE ACTUAL FFMPEG COMMAND  ##
################################

ffmpeg -i "$INPUT_PATH" -c:v libx264 -pix_fmt yuv420p -preset slow -crf $CRF_VAL -c:a aac -b:a $AUDIO_BITRATE "$OUPUT_PATH"
