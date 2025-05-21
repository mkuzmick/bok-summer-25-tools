#!/bin/bash

curl -F file=@$1 -F channels=$SLACK_LOG_OF_OPERATIONS_CHANNEL -F token=$SLACK_TOKEN https://slack.com/api/files.upload

echo "just uploaded ${1} to slack log channel"
