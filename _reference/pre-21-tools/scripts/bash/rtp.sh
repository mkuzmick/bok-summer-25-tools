#!/bin/bash

VIDEO_TITLE=$(youtube-dl -e --get-title  $1)
NORMALIZED_VIDEO_TITLE=${VIDEO_TITLE//[^a-zA-Z0-9]/_}
echo $NORMALIZED_VIDEO_TITLE
NEW_AUDIO_PATH="~/Desktop/Youtube_Samples/Audio/${NORMALIZED_VIDEO_TITLE}"

echo $NEW_AUDIO_PATH
say "we are about to rock the party by downloading $VIDEO_TITLE"

NEW_NEW_VIDEO_PATH=$(youtube-dl --get-filename -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' -o "$NEW_VIDEO_PATH-%(id)s.%(ext)s" $1)

youtube-dl -f 'bestaudio[ext=m4a]' -o "$NEW_AUDIO_PATH-%(id)s.%(ext)s" $1

say "all done downloading. we are now ready to rock the party"
