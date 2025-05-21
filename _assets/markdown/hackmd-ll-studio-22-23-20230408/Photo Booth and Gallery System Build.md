---
tags: microproject
title: "Photo Booth and Gallery System Build"
---

# ll-microproject-photo-booth-and-gallery-system-build

## elements

- the equipment
    - 2x Hyperdeck recorders
    - ATEM Constellation HD 1M/E
    - UltraStudio
    - Computer (ll-main-studio?)
        - or just to the ATEM and computer (or 2 or 3)
            - actually just connect the ATEM to the computer, that's fine
            - the hub can be connected to the wall ethernet, but this isn't crucial because we'll be on a different subnet at the other place anyway
            - connect it to a Mac that you'd be happy carrying over to the other place
        - the computer needs to have installed
            - [blackmagic desktop video package](https://www.blackmagicdesign.com/support/download/2de27a45d5454a0aa37353b4a742c179/Mac%20OS%20X) (including the media express app)
            - blackmagic ATEM package (including ATEM setup and ATEM switcher apps)
            - ideally DaVinci Resolve as well (for livestills if desired)
            - node, ffmpeg, imagemagick, etc etc (update all if already on machine)
    - lights and cameras


## basic workflow


- the signal goes from the cameras (and potentially computer by way of an HDMI-to-SDI converter) to the switcher (SDI)
    - and the switcher and switching computer are connected via ethernet (note: you can have a dedicated switching computer that's different from the capture computer--which could itself be different from the computer that is generating backgrounds for the chromakey setup)
- then two outputs from the switcher go to the hyperdecks
- monitors (if there are two) can come from the hyperdecks--but if there is only one monitor it should get PGM1 from the system, with the two hyperdecks getting dedicated feeds (probably just one cam, but record both the clean feed and the feed with the key)
- PGM1 and/or the clean feed should then go to the ultrastudio, which sends this to the computer over a thunderbolt cable (aim for a fast reliable one)
- in Media Express, confirm that the image is visible, then confirm that you know where you are capturing video and stills (create folders intentionally and target them in the app)
- as stills show up in your capture folder, process them
    - either manually in photoshop
    - or with a script that runs on a watch folder (like the bwFolder watch script we've used in the past)
- upload processed stills to airtable along with other data we want in the record
- print the record, either through page-designer or some other way



## Some Links, photos, etc. in our process:

[atem manual](https://www.bhphotovideo.com/lit_files/594728.pdf)

[desktop video manual](https://documents.blackmagicdesign.com/UserManuals/DesktopVideoManual.pdf)

[guide to download desktop video package](https://blueframetechnology.freshdesk.com/support/solutions/articles/35000162340-downloading-and-updating-blackmagic-drivers)

[link to airtable base prototype](https://airtable.com/appeEVXCFa2SpA3xB/tblNV0gAuxnH0oEYJ/viw05oL82an0LdRRn?blocks=bipM373YkdKRny256)