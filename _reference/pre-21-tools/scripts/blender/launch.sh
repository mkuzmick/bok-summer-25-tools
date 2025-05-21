#! /usr/bin/env zsh

BLEND_TEMPLATE="$HOME/Development/blender-scripts/blender-templates/empty-file.blend"
echo $BLEND_TEMPLATE
OUTPUT_PATH="$HOME/"
echo $OUTPUT_PATH
blender $BLEND_TEMPLATE --background --python /Users/mk/Development/blender-scripts/make-pumpkins-001.py
