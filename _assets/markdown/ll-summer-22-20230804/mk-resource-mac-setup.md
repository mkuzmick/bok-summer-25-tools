---
tags: mk, resources
---


# mk-resource-mac-setup

- get through mac os screens, then
- connect to Harvard Secure
- open app store and install everything
- install homebrew
    - don't forget to then enter the two lines near the end of the installers logs on newer Macs.  They will look something like this:
    ```
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/YOUR_USER_ACCOUNT_NAME/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
    ```
- sign in to [Adobe](https://www.adobe.com) or [Creative Cloud](https://creativecloud.adobe.com/cc/), download and install (first Photoshop, then everything else through the Creative Cloud App)
    - Photoshop
    - Illustrator
    - InDesign
    - XD
    - Premiere Pro
    - After Effects
    - Lightroom Classic
    - Dimension
    - Character Animator
    - Audition
    - Substance 3D Painter
    - Substance 3D Sampler
    - Substance 3D Designer
    - Substance 3D Stager
    - UXP Developer Tools?
- once homebrew is installed
    - `brew install git`
    - `brew install visual-studio-code`
    - `brew install node`
- log in to github as learninglab-studio
- git clone `the-tools-21-22` or similar
```
cd the-tools-21-22
code .
```
- find your way to the mac setup scripts and run their elements
    - `mainbrew.sh` has lines for most of the typical packages you'd install with homebrew, you can type them manually or tweak the script to your liking and then run it
    - 



## to-do

### did this time

- create storage drive
- commented out mysql
- ran some fonts only --fix this
- install unity version
- install unreal version
- install maxon
    - then c4d
    - redshift
- download unity templates
- download unreal projects and content
- houdini
- obs
    - check in to obs-ndi and virtualcam?
- in blender
    - add-ons => node wrangler on
    - preferences => navigation => orbit around selection
    - render path
    - asset library path
- in unreal
    - install engine
    - create new project with assets in appropriate storage destination
- in unity
    - install version
    - install templates

### preferences not yet set

- power
- sidebar in finder
- screenshots not ideal just yet
- 

### resources

https://support.apple.com/guide/terminal/edit-property-lists-apda49a1bb2-577e-4721-8f25-ffc0836f6997/mac

```
defaults write com.apple.Finder FXPreferredViewStyle xxxx
```

[good intro article on setting mac preferences](https://pawelgrzybek.com/change-macos-user-preferences-via-command-line/) that we should send people to if they haven't done this before.

[an ok article on defaults](https://www.shell-tips.com/mac/defaults/#gsc.tab=0) as backup

[Apple's own doc on changing plist from terminal](https://support.apple.com/guide/terminal/edit-property-lists-apda49a1bb2-577e-4721-8f25-ffc0836f6997/mac)

[location of plist for sidebars](https://discussions.apple.com/thread/251606267)---maybe one of those things that comes to exist after you do something? be sure to check before doing something!

[stack exchange comments that could be useful](https://apple.stackexchange.com/questions/392088/add-finder-sidebar-section-via-terminal)

