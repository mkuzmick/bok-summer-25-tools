#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var theNumberSuffixes = [];

// change this to the right folder path for you when you run the script
var folderPath = '/Volumes/134_2050/all_sounds/samples'
var allTheFiles = fs.readdirSync(folderPath);
var logOfOperations = "Here is the log of rename operations:\n"

for (var i = 0; i < allTheFiles.length; i++) {
  theNumberSuffixes.push(("0000" + (i+1)).slice(-4));
}

for (var i = 0; i < allTheFiles.length; i++) {
  var theIndex = Math.floor(Math.random() * theNumberSuffixes.length);
  var theElement = theNumberSuffixes.splice(theIndex, 1);
  var oldPath = path.join(folderPath, allTheFiles[i]);
  var newPath = path.join(folderPath, ("sample_" + theElement + ".aiff"))
  logOfOperations+=("\n" + (i+1) + ". " + oldPath + " will be renamed " + newPath);
  fs.renameSync(oldPath, newPath);
}

fs.writeFileSync((path.join(folderPath, "_log_of_rename_operations.txt")), logOfOperations, 'utf8')
