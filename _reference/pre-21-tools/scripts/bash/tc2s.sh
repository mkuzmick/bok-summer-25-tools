#!/bin/bash
# command structure =
# tc2s.sh [seconds_in] [video_path]

# $1 = seconds in
# $2 = video_path
# $3 = still_path

echo "drag in the path to the video file then hit ENTER (delete the final space if one shows up when you drag the file in):"
read the_file

echo "enter the 8 digit timecode then hit ENTER (with colons--make sure it's 8 digits!):"
read request_TC

#echo "looks like the tc is $tc and the video_path is $video_path"

function frames_from_tc {
  #statements
  hr=$(echo $1 | cut -d":" -f 1)
  min=$(echo $1 | cut -d":" -f 2)
  sec=$(echo $1 | cut -d":" -f 3)
  frames=$(echo $1 | cut -d":" -f 4)
  sec_frames=$(($sec*24))
  min_frames=$(($min*60*24))
  hr_frames=$(($hr*60*60*24))
  start_frames=$(($frames + $sec_frames + $min_frames + $hr_frames))
  echo $start_frames
}

function filenamesuffix_from_tc {
  #statements
  hr=$(echo $1 | cut -d":" -f 1)
  min=$(echo $1 | cut -d":" -f 2)
  sec=$(echo $1 | cut -d":" -f 3)
  frames=$(echo $1 | cut -d":" -f 4)
  echo $hr$min$sec$frames
}


#the_file="/Users/mk/Movies/20170213_005_BTS_ZK/C300a/aa_001.mov"
the_JSON=$(/mk_dev/ffprobe -v quiet -print_format json -show_format -show_streams $the_file)
relevant_JSON=$(echo -e "$the_JSON" | grep 'timecode')
the_TC=$(echo $relevant_JSON | cut -d'"' -f4)
start_frames=$(frames_from_tc $the_TC)

echo "the frames for /Users/mk/Movies/20170213_005_BTS_ZK/C300a/aa_001.mov (from $the_TC) are:"
echo $start_frames

#request_TC="17:02:46:07"
request_frames=$(frames_from_tc $request_TC)

echo "the request is $request_TC"
echo "and the frames for the request are $request_frames"
command_frames=$(($request_frames-$start_frames))
echo "so for the command we need $command_frames"

seconds_to_request=$(echo "scale=3; ${command_frames}*1001/24000"| bc -l)
echo "and the seconds of the request are $seconds_to_request"


filename=$(basename "$the_file")
the_path=$(dirname $the_file)
extension="${filename##*.}"
filenamebase="${filename%.*}"

echo "filename:"
echo $filename
echo "the path:"
echo $the_path
echo $filenamebase

new_filename_suffix=$(filenamesuffix_from_tc $request_TC)
new_filename=$the_path/$filenamebase'_'$new_filename_suffix".png"

echo "so new filename is $new_filename"
 #echo "scale=3; (27*1001)/24000" | bc

/mk_dev/ffmpeg -ss $seconds_to_request -i $the_file -vframes 1 $new_filename

#"timecode": "17:02:45:04"
