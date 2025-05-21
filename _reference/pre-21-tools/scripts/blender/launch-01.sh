#! /usr/bin/env zsh

# change BLENDER_WORK_FOLDER to match your setup
# it will need a /renders subfolder
BLENDER_WORK_FOLDER="$HOME/Desktop/_blender"

CURRENT_TIME=$(date "+%Y%m%d%H%M%S")
OUTPUT_PATH="$BLENDER_WORK_FOLDER/output-$CURRENT_TIME.blend"
RENDER_PATH="$BLENDER_WORK_FOLDER/renders/scripted/test-$CURRENT_TIME.png"
PYTHON_SCRIPT="$HOME/Development/the-tools/tools/scripts/blender/make-and-render.py"
TEMPLATE="$HOME/Development/the-tools/assets/blender/just-a-cam.blend"
DATE_FOR_TEXT=$(date "+%Y%m%d")
TIME_FOR_TEXT=$(date "+%H:%M:%S")

echo "the date for text is being sent in as $DATE_FOR_TEXT"

blender $TEMPLATE --background --python $PYTHON_SCRIPT -- --SHOOT_DATE="$DATE_FOR_TEXT" --SHOOT_TIME="$TIME_FOR_TEXT" --OUTPUT_PATH="$OUTPUT_PATH" --RENDER_PATH="$RENDER_PATH"
# open "$OUTPUT_PATH" -a blender
open $RENDER_PATH -a Preview
