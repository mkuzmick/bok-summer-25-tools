---
tags: computer
---

# icloud-plan

#### [Airtable tracker](https://airtable.com/appFQICwZJY2WaXkU/tblCooPGJHP1g0AUc/viwNVmt0ZSUhPqWGu?blocks=hide)

#### [Last year's setup scripts](https://hackmd.io/BJm6Fe3bSRC7I-32wytCzA)

## iCloud groups:

| colors@learninglab.xyz? | studio@learninglab.xyz | Laptops |
| -------- | -------- | -------- |
| M1 iMacs    | Mac studios     | Laptops     |
| iMac pro     | Mac Minis     | Macbook Airs?     |
|      |      | pre-2019 iMacs     |

### to-do's 
* log and track all serial numbers
    * update any older computers that have been donated
* rename/label iPads?
* fresh install on new partition
    * _resolve partition
    * color_storage partition
    * encrypt old partition, rename
* 



### questions
* Filevault settings?
* how much to remove from current partition?
* keep using learninglabcolor@gmail? 


### new apps
*  Effect house
    *  log in?
*  Spark AR?
*  Lens Studio?
*  

### to add to script
* "Require password 8 hours after sleep/screen saver"
    * `defaults write "$HOME/Library/Preferences/ByHost/com.apple.coreservices.useractivityd.plist" ActivityAdvertisingAllowed -bool no
defaults write "$HOME/Library/Preferences/ByHost/com.apple.coreservices.useractivityd.plist" ActivityReceivingAllowed -bool no`
* disable Universal Handoff(shared clipboard)


## Last year plan

### App Store
- Davinci Resolve
- FCPX
- Motion
- Compressor
- Glyphs 2
- Marked 2
- FoldingText
- BetterSnapTool
- Slack
- Logic Pro X
- Xcode
- DaisyDisk
- Screenflow
- GarageBand
- Numbers
- Keynote
- Pages
- MS Word
- MS PowerPoint
- MS Excel


### Adobe

from installer that homebrew installed:
* Photoshop
* Lightroom Classic
* Lightroom
* After Effects
* Audition
* InDesign
* Illustrator
* Xd
* Premiere Pro
* Animate
* Character Animator
* Substance 3D Painter
* Substance 3D Designer
* Substance 3D Sampler

log in with ID as appropriate

### Misc web-based

* C4D and Maxon One
* Houdini
* Unreal (from installer brew installed)
* Unity (from installer brew installed)
* Ableton?
* Printer drivers
* Blackmagic ATEM software (both apps)
* Blackmagic Desktop Video
* Obsidian for macos
* 

### Scriptable Preferences
- set all notifications from alert to banner?
- disable certain notifications?

```
# open FCPX to make sure the later prefs work

open -a "Final Cut Pro.app"

# power management for desktops
sudo pmset displaysleep 180
sudo systemsetup -setcomputersleep Never

# sudo pmset sleep 180
# sudo systemsetup -setcomputersleep 60
# Turn Off System Sleep Completely


# show all file extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# show hidden files
defaults write com.apple.finder AppleShowAllFiles -bool YES && killall Finder

# show scroll bars only on scroll
defaults write NSGlobalDomain AppleShowScrollBars WhenScrolling

# save screenshots to desktop
mkdir ~/Desktop/screenshots
defaults write com.apple.screencapture location ~/Desktop/Screenshots

# make library visible
chflags nohidden ~/Library/


# Automatically hide and show the Dock, speed animation
defaults write com.apple.dock autohide -bool true
killall Dock

# show only active apps in dock
defaults write com.apple.dock static-only -bool true
killall Dock

# silent on startup
sudo nvram SystemAudioVolume=%00

# Enable tap to click (Trackpad) for this user and for the login screen
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -bool true
defaults write com.apple.AppleMultitouchTrackpad Clicking -bool true
defaults -currentHost write NSGlobalDomain com.apple.mouse.tapBehavior -int 1
defaults write NSGlobalDomain com.apple.mouse.tapBehavior -int 1

# Enable 3-finger drag. (Moving with 3 fingers in any window "chrome" moves the window.)
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadThreeFingerDrag -bool true
defaults write com.apple.AppleMultitouchTrackpad TrackpadThreeFingerDrag -bool true



# Expand save panel by default
defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true

# Expand print panel by default
defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true

# Automatically quit printer app once the print jobs complete
# doesn't seem to be working
# defaults write com.apple.print.PrintingPrefs “Quit When Finished” -bool true

# Check for software updates daily, not just once per week
defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 1

# Always open everything in Finder's column view.
defaults write com.apple.Finder FXPreferredViewStyle clmv

# Show icons for hard drives, servers, and removable media on the desktop
defaults write com.apple.finder ShowExternalHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowMountedServersOnDesktop -bool true
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool true

# Automatically open a new Finder window when a volume is mounted
defaults write com.apple.frameworks.diskimages auto-open-ro-root -bool true
defaults write com.apple.frameworks.diskimages auto-open-rw-root -bool true
defaults write com.apple.finder OpenWindowForNewRemovableDisk -bool true

# Show status bar in Finder
defaults write com.apple.finder ShowStatusBar -bool true

# Enable the Develop menu and the Web Inspector in Safari
defaults write com.apple.Safari IncludeDevelopMenu -bool true
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true
defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled -bool true

# Display full POSIX path as Finder window title
defaults write com.apple.finder _FXShowPosixPathInTitle -bool true

# Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

# Prevent Time Machine from prompting to use new hard drives as backup volume
defaults write com.apple.TimeMachine DoNotOfferNewDisksForBackup -bool true

# Avoid creating .DS_Store files on network volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# Use plain text mode for new TextEdit documents
defaults write com.apple.TextEdit RichText -int 0

# Apps, disable App Nap for all apps
defaults write NSGlobalDomain NSAppSleepDisabled -bool true

# disable automatic capitalisation
defaults write NSGlobalDomain NSAutomaticCapitalizationEnabled -bool false

# disable smart quotes
defaults write NSGlobalDomain NSAutomaticQuoteSubstitutionEnabled -bool false

# screensaver
defaults -currentHost write com.apple.screensaver idleTime 1800

# show battery percentage in menu bar
defaults write com.apple.menuextra.battery ShowPercent -bool YES

# Disable Autocorrect
defaults write -g NSAutomaticSpellingCorrectionEnabled -bool false

# install FCPX first
defaults write -app "Final Cut Pro" FFDefaultStillDuration -int 2
defaults write -app "Final Cut Pro" FFImportCopyToMediaFolder -bool false
defaults write -app "Final Cut Pro" FFCreateOptimizedMediaForMulticamClips -bool false

# stop spotify from opening when you log in
defaults write com.spotify.client AutoStartSettingIsHidden -bool false

# Kill affected applications
for app in Finder Dock Mail Safari iTunes iCal Address\ Book SystemUIServer; do killall "$app" > /dev/null 2>&1; done
echo "Done. Note that some of these changes require a logout/restart to take effect."

```

### Unscriptable Preferences

move them to the above section if you can find the code for them

* in Finder
    * show in sidebar
        * home folder
        * computer folder
        * all drives
        * Movies
        * Music
        * Developer
* in Blender
* in Logic
    * download all sounds
    * set up standard prefs
* in Garageband
    * open at least once
    * download all sounds
    * add Learning Lab to "info" prefs
* in Terminal
    * default shell? (if changing)
    * background color, opacity
    * font family and font size
* in FCPX
    * we think the script took care of these, but confirm
        * leave files in place on import
        * do not render in background
        * do not create optimized files for multicam clips
        * add stills as an export option
        * remove DVD, etc as export options
* github login
* heroku login
* ableton login
* Unity login
* Unreal login
* Spotify login
* adobe login (and installs, see above)
* xcode plugins and gists and shortcuts
    * many of these are probably scriptable, and we don't have a great list of them. This is definitely a place for more thinking and working
