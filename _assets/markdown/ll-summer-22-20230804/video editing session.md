---
tags: mdf
---

# video editing session 

* get some footage on drives
    * gened 1049
    * stock footage
    * download at least one video from prelinger we can show them 
* show to how to rip stuff
    * tell them we have a script for this (see below)
    * [Prelinger Archives](https://archive.org/details/prelinger)
* Start with Vox video in fcpx
* Using Final Cut as a research tool, an analytical tool
* Range selected keywords
    * select clip
    * hit shift + F - this will bring it into the viewport
    * set an in and out at a really granular point (down to the seconds)
    * then make a keyword for, say, a person (like Huey Newton in the Vox video)
    * this really useful if you're doing research on a bunch of films
    * could also make a montage by creating a new project with, say, Huey Newton and another figure and then drag those keyword collections into that project
* in the timeline: overcut the shots (let's students analyze a model)
    * have students guess how many shots per second something has and then have the students do the cuts and count (do this for a 30 second segment or something short)
    * drag playhead until you see a cut
    * then insert a cut there
    * a cool exercise for them to learn the key words for cutting things
    * end result gives you a sense of the pacing of the cuts in an edited video (in the sense of how many shots you would need to create this kind of example)
    * compare to ken burns effect of slow pans (versus the quick cuts in the vox video)
* color correction stuff


---

### Downloading from YouTube

By far the safest and most reliable way to download from YouTube is to use [youtube-dl](https://youtube-dl.org/), a simple command line tool. 

To use it on Windows:
1. install [choco](https://chocolatey.org/install) if you don't already have it
2. `choco install youtube-dl`
3. then `youtube-dl "https://www.youtube.com/watch?v=dQw4w9WgXcQ"` or other URL

To use it on Mac:
1. install [homebrew](https://brew.sh/) if you don't already have it
2. `brew install youtube-dl`
3. then `youtube-dl "https://www.youtube.com/watch?v=dQw4w9WgXcQ"` or other URL

If you want a specific format:
1. `youtube-dl -F [your/URL]` to see all formats so you can select the number of the format you want--let's say "22"
2. `youtube-dl -f 22 [your/URL]` to download

be sure to `cd /Users/me/Desktop/folder-i-want-my-stuff-in` first!

Here's [another resource about downloading video clips](http://resources.learninglab.xyz/simple/projects/SOCIOL1142/Found-and-archival-footage).

You can also use online methods at your own risk.