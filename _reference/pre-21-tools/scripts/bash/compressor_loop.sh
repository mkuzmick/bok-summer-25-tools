#!/bin/bash
# command structure =
# compressor_loop

the_folder=/Volumes/131_2050/20170726_702_MindingMaking_Autodesk

# echo "drag in the path to the video file then hit ENTER (delete the final space if one shows up when you drag the file in):"
# read the_folder

echo "the folder is $the_folder"

for f in $the_folder/*; do
    echo "$f is what we're working with"
    if [[ -d $f ]]; then
        # $f is a directory
        echo "$f is a folder"
    fi
done
