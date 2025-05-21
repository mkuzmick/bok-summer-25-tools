# ll-microproject-mk-photobooth-notes

also how to connect this to MDF orientation (like this is maybe what we use with each of their 60 second things)

- computers
    - computer for switching
    - computer for airtable/transcription
    - computer for generating and displaying transcription
    - computer for displaying graphics
- sources for switcher(s)
    - cam A
    - cam B?
    - cam C?
    - graphics computer
    - transcription computer
- outs from switcher
    - audio to transcription computer
    - pgm1 to main room
    - confidence monitor
    - pgm1 to recorder
    - clean feed(s) to recorder
    - any other angles to recorder?
        - bts?
        - CU of talent?
- screens
- apps and scripts
    - handling transcript
    - handling record creation
    - handling photo styling?
    - potentially handling styling
    - handling print?

## data handling

- mechanics for input
    - voice to speech
        - alexa or google API?
        - google meet
            - with save extension
            - and the meet video layered on our feed
    - google apps script for sending google docs text to Airtable
        - how to parse for the right record to update?
        - query AT initially for buttons to add to script? can you do this?
        - better in Slack?
        - send text from apps script to Slack with drop-downs for norming/validation and tagging?
    - just cut and paste manually
    - generate record with button interface from slack? 
        - like initiate a new record for interview subject and return buttongs for logging
        - log each press as unique event but link to subject
        - when apps script gets text we know by time which record it's for?
        - or just have that be in the slack modal?
        - select the Q in Slack surface then paste in the text and submit?
- model
    - person
        - name
        - dept
        - role
    - interview
        - links to person
        - links to transcript?
    - transcript
        - or just in interview?
    - logs
        - timestamps of moments
    - questions
        - text for display
        - styling?