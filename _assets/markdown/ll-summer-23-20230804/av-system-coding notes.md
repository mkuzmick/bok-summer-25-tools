---
tags: code, av
---
# av-system-coding notes

* transcriptions are going
* black and white hero shots
    * scripts
        * python version
        * shell script version
    * next step: 
        * pull down all the hero shots from the photo video base
        * run a script to change them to black and white 
            * could maybe be done in an airtable code block 
            * OR through airtable API request
        * but good to host in slack maybe and then go to airtable?
- ingest augmentations
    - log all clips (with clip data)
    - autostills in that base (or linked at least)
    - reference stable synology links
    - ways of testing database and synology
- slack image-bots
    - autostills on import for each clip go to some channel
    - maybe emojis to check selects
    - and then edited images to another channel (publish-your-images? or do they need to be private?)
        - i think we would want publish-your-images to be used as needed by folks wanting markdown.
        - ll edited photos are not necessarily all able to radically public on the web (ie. photos for courses)
- [ingest base 19.3](https://airtable.com/apprOESbGkLjqASGB/tblIql7bYOGvPGd21/viwwcTsa4cAhuqkVE?blocks=hide) as inspo
    - new version of this base
    - prioritize stills (connected to hero shots) 
- atem control
    - xml-based
    - api-based

to do:
* create a startup script (xml thats called custom studio startup) that norms cameras 1-20 and gives them the same .. all the things we control

Projects where want to try out this XML stuff:
* proof of concept idea:
    * generating a timeline that has a lower third with speaker's name
    * with the question in a title card

### mk xml feature requests

- macros
    - all 20 cameras to 4700 and 17
    - set multiview 1 to 4-up (50 percent in corners)
    - set multiview 2 to 4-up (50 percent in corners)
    - set multiview 1 to 2-up (100 percent but center cropped so they are side by side for compare and contrast)
    - set multiview 2 to 2-up (100 percent but center cropped so they are side by side for compare and contrast)