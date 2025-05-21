#!/bin/bash
# command structure =
# io2segment.sh [filename] [in_TC] [out_TC]

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

function frames_to_seconds {
  seconds_to_request=$(echo "scale=3; ${1}*1001/24000"| bc -l)
  echo $seconds_to_request
}

# the_file=$1
# in_TC=$2
# out_TC=$3

echo "drag in the path to the video file then hit ENTER (delete the final space if one shows up when you drag the file in):"
read the_file

echo "enter the 8 digit timecode for the IN point then hit ENTER (with colons--make sure it's 8 digits!):"
read in_TC

echo "enter the 8 digit timecode for the OUT point then hit ENTER (with colons--make sure it's 8 digits!):"
read out_TC


#the_file="/Users/mk/Movies/20170213_005_BTS_ZK/C300a/aa_001.mov"
the_JSON=$(/mk_dev/ffprobe -v quiet -print_format json -show_format -show_streams $the_file)
relevant_JSON=$(echo -e "$the_JSON" | grep 'timecode')
the_TC=$(echo $relevant_JSON | cut -d'"' -f4)

start_frames=$(frames_from_tc $the_TC)
#echo $start_frames
#in_TC="17:02:46:07"
#out_TC="17:02:54:10"
in_frames=$(frames_from_tc $in_TC)
#echo $in_frames
request_frames=$(($in_frames-$start_frames))
#echo $request_frames
request_seconds=$(frames_to_seconds $request_frames)
#echo $request_seconds
out_frames=$(frames_from_tc $out_TC)
#echo $out_frames
duration_frames=$(($out_frames-$in_frames))
#echo $duration_frames
duration_seconds=$(frames_to_seconds $duration_frames)
#echo $duration_seconds


filename=$(basename "$the_file")
the_path=$(dirname $the_file)
extension="${filename##*.}"
filenamebase="${filename%.*}"

#echo "filename:"
#echo $filename
#echo "the path:"
#echo $the_path
#echo $filenamebase

filename_in=$(filenamesuffix_from_tc $in_TC)
filename_out=$(filenamesuffix_from_tc $out_TC)
new_filename=$the_path/$filenamebase'_'$filename_in'-'$filename_out".mov"
#echo "so new filename is $new_filename"

/mk_dev/ffmpeg -ss $request_seconds -i $the_file -v quiet -t $duration_seconds -c copy $new_filename


#echo "/mk_dev/ffmpeg -ss $request_seconds -i $the_file -t $duration_seconds -c copy $new_filename"
