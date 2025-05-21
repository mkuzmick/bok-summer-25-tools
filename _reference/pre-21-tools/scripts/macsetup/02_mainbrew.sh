#!/bin/bash

#####################
# homebrew packages #
#####################

# git should already be installed by the 01_start.sh script
# brew install git

# fontforge
# making xquartz first to require pw
brew install --cask xquartz
brew install --cask fontforge

# Adobe Creative Cloud Installer (open next)
brew install adobe-creative-cloud

# Chrome
brew install --cask google-chrome

# mac app store installer
# brew install mas
# aws cli
brew install awscli

# ffmpeg (and ffprobe)
brew install ffmpeg
# youtube-dl
brew install youtube-dl

# GitHub's hub utility
brew install hub

# mysql
# brew install mysql


#########
# casks #
#########





# Firefox
brew install --cask firefox

# Dropbox
brew install --cask dropbox

# VLC
brew install --cask vlc

# nvAlt
# brew install --cask nvalt

# Blender
brew install --cask blender

# epic games launcher
brew install --cask epic-games

# unity
brew install --cask unity-hub

# skype
# brew install --cask skype

# clipgrab
brew install --cask clipgrab

# heroku (then run `heroku login`)
brew tap heroku/brew && brew install heroku

# imagemagick
brew install imagemagick

# exiftool
brew install exiftool



#########
# fonts #
#########

###########
# drivers #
###########

brew tap homebrew/cask-drivers
# brew install --cask nvidia-cuda
# brew install --cask sonos
brew install spotify
brew install synologyassistant
# brew install xbox360-controller-driver-unofficial

# ableton & max
brew install ableton-live-lite
brew install cycling74-max
