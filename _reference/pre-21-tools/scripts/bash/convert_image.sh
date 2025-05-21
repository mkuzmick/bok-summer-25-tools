#!/bin/bash

DIR=$(dirname "$1")
THEDATE=`date '+%Y%m%d.%H%M%S'`
JPGPATH=~/Desktop/stills_slacked/ultrastudio_$THEDATE.jpg

ffmpeg -i $1 -q:v 2 $JPGPATH
curl -F file=@$JPGPATH -F channels=$SLACK_LOG_CHANNEL -F token=$SLACK_TOKEN https://slack.com/api/files.upload
rm $1

echo "just ran ffmpeg -i ${1} -q:v 2 ${JPGPATH}"
echo "put the new file at ${JPGPATH} and sent it to Slack, then deleted the old file"
