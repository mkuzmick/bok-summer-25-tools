# iMac Plan

[link to current scripts](https://github.com/learninglab-studio/the-tools-21-22/tree/main/tools/scripts/macsetup).

### Plan for each color

- Purple
    - ATEM Control
    - VideoHub
    - 
- Yellow
    - Clip Studio
- Red
    - Sketchup
- Green
- Orange
- Blue
- Silver
- Pro 
    - Ableton
    - Maxon One Suite


### Overall questions

- do we still want all the Atom packages? it seems like there's a shift to VSCode
- should they all receive the full fonts package -- or a smaller version?
    - let's customize this
- any installs to add?
    - Zoom?
    - Red Giant?
    - Red Shift?
- Individual accounts for Chrome?
- Individual accounts for Synology10

### actions from questions
* let's cut out the apm install scripts, but for next time let's figure out if there are any vs code packages we should be installing?
* let's create a smaller list of fonts
* install Zoom
* install ALL Maxon stuff on Gray
* create g accounts for each color
* create new volume of Synology10 for public use, create accts for the colored computers, all with a variation on this year's password

### To do before wiping previous versions
- Release licenses
    - Sketchup
    - Ableton
- Move working files into _storage
- Archive 
    - exports
    - Airdropped files
-  

### Utils

install [Homebrew](https://brew.sh/).

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, on M1 macs, set in path by copying the two lines sent back which will have the structure (but may not be identical to) the following:

```
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/ll-studio/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

then you need git, node and a code editor

```
brew install git
brew install node
brew install visual-studio-code
```

Or if you prefer atom, `brew install atom`--but we're moving to vscode this year.

Once you have node installed you can set up your development folder and clone this repo:

```
cd ~
mkdir Development
cd Development
git clone https://github.com/learninglab-studio/the-tools-21-22.git
cd the-tools-21-22
npm install
```

Then you can add the scripts in the-tools-21-22 to your path (and fix your prompt) with these lines that add to your `.zshrc` file:

```
ZSHRC_PATH=~/.zshrc
cd ~/Development/the-tools-21-22/tools/scripts/ex
SCRIPTS_DIR=$(pwd)
echo "export PATH=/usr/local/bin:${SCRIPTS_DIR}:\$PATH" >> $ZSHRC_PATH
echo "PROMPT='%2~ %# '" >> $ZSHRC_PATH
```

open up an additional window and run additional `npm install` commands while your `brew install` commands are also running.

The next brew installs are
```
brew install ffmpeg
brew install awscli
brew install youtube-dl
# brew install mysql
brew  install google-chrome
brew  install firefox
brew  install vlc
brew  install blender
brew  install adobe-creative-cloud
brew  install epic-games
brew  install unity-hub
brew  install clipgrab
brew tap heroku/brew && brew install heroku
brew install imagemagick
brew install exiftool
brew  install spotify
brew  install synologyassistant
brew  install ableton-live-lite
brew  install cycling74-max
```
The next npm installs are

```
npm install -g nodemon
# npm install -g express-generator
# npm install -g m2s
npm install -g gif-machine
npm install -g ll-transcode-machine
# npm install -g simple-rename-machine
npm install -g chalk
npm install -g figlet
npm install -g gatsby-cli



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


### Peripherals
- printer (don't put IPs in the repo)


### Fonts
- let's just put a few of the most commonly used here, but it would be nice to store all as an array
- remember the one or two packages that need to be installed first for some fonts
- here's an old list of [all the fonts](https://github.com/learninglab-studio/the-tools-21-22/blob/main/tools/scripts/macsetup/04a_lots_of_fonts.sh), but things change quickly in this zone. We should keep it small so we can keep it updated :)
    - These look good. Please uncomment the following:
    ```
    brew cask install font-work-sans
    brew cask install font-poppins
    brew cask install font-oswald
    brew cask install font-lobster
    brew cask install font-lobster-two
    brew cask install font-lato
    brew cask install font-karla
```




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
* Synology10 alias on desktop
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
* ~~github login~~
* slack login
* chrome login 
* heroku login
* ableton login
* Unity login
* Unreal login
* Spotify login
* adobe login (and installs, see above)
* xcode plugins and gists and shortcuts
    * many of these are probably scriptable, and we don't have a great list of them. This is definitely a place for more thinking and working



## To Do

* get Dock on the left side
* maybe make Dock visible on public machines?
* 