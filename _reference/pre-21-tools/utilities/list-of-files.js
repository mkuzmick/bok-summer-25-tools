var recursive = require("recursive-readdir");
var fs = require("fs");
var path = require("path");

var allFiles = function(folderPath){
  console.log("about to get all the files");
  return new Promise(function(resolve, reject){
    recursive(folderPath, function (err, files) {
      if (err) {
        reject(err)
      } else {
        var theFiles = [];
        for (var i = 0; i < files.length; i++) {
          console.log("adding " + files[i]);
          theFiles.push(files[i]);
        }
        resolve(theFiles);
      }
    });
  });
}

var allFilesWithRegex = function(folderPath, regex){
  console.log("about to get all the files");
  return new Promise(function(resolve, reject){
    recursive(folderPath, function (err, files) {
      if (err) {
        reject(err)
      } else {
        var theFiles = [];
        for (var i = 0; i < files.length; i++) {
          if (regex.test(files[i])) {
            console.log(`${files[i]} is one of the files`);
            theFiles.push(files[i]);
          } else {
            console.log(`${files[i]} is not one of the files we're looking for.`);
          }

        }
        resolve(theFiles);
      }
    });
  });
}

module.exports.allFiles = allFiles;
module.exports.allFilesWithRegex = allFilesWithRegex;
