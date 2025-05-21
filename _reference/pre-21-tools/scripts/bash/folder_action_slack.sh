#!/bin/bash
# make sure that there's SLACK_WEBHOOK_URL env variable
# testing from mbp

MESSAGE=$1" is the file or folder that was just added."

echo $MESSAGE " is your message"

echo "sending this to slack"

PAYLOAD='{"text":"'$MESSAGE'"}'

echo "the payload is $PAYLOAD"
curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" $SLACK_WEBHOOK_URL
