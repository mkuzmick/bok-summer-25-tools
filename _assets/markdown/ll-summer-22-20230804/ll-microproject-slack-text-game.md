# ll-microproject-slack-text-game

as a first step towards the Game of Harvard Life, we'll create a really simple text-game-engine with Slack and Airtable. If we do it this way, we'll have this simple-text-game-engine whether or not we opt to go for it for this project (could be that Twine or Episode is just fine). This will be useful for creating interactive games and learning experiences in our Slack.

get started by cloning the [repo](https://github.com/learninglab-studio/ll-text-game-bot)

`git clone https://github.com/learninglab-studio/ll-text-game-bot.git`

## Airtable

How many classes of objects should have in Airtable?
- Games
    - if we're going to have more than one game per base
    - each may have many situations, but must have one initial situation (or a way of defining a random or user-chosen initial situation?)
- Situations
    - in other systems called rooms--these are choice points or stops along the way in a single-track game
        - game id
        - choices (link to multiple)
        - reverse link to choice that sends you to the situation
        - image
- Choices
    - possible moves for a given situation
    - leads to a new situation
    - show up as buttons in slack
        - reverse link to situations that use it
        - link to situation the choice leads to
        - string for the button
        - would these ever under any circumstances involve images?
- Players
    - track slack users
    - keep track of games played and moves made
    - and scores? or generate scores by querying moves?
- Game Sessions
    - for logging each instance of a user playing a game
    - each will have an initiating user (but then maybe many players?)
- Game Moves
    - for logging every single move any player makes
        - game id
        - game session id
        - player id
        - situation id
        - choice id
- other?
    - achievements?
    - levels?
    - metagames?
    - level sequences?
    - inventory items?
    - player inventories?


## Slack


### Slack Functions

- initiate game with slash command
- view options
    - modal that gets updated
    - app home that gets updated
    - message in game channel that gets updated
    - comment sequence in game channel
    - message sequence in DM
    - message sequence in app home messages
    - message sequence in new channel devoted to that game? would probably pollute the space.
    - could be private group or group DM to make more ephemeral?
- send initial choice
    - with embedded session id?
    - and user id? or link user to session? this won't work for multiplayer games
- listen for choice actions
- respond with new choice

### Message Format
