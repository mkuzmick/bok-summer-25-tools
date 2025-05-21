# ll-project-harvard-life-game

## summary

Harvard Life is an interactive story game that allows faculty to assume the position of an undergraduate student. In this role, faculty players are faced with circumstances and conditions that many BIPOC and FGLI students regularly face. As players make choices, they receive emails from faculty and TFs that inform players of course policies, advise players on the discipline, and evaluate players’ behavior. The purpose of the game is to offer faculty the chance to learn about the challenges that BIPOC and FGLI face inside and outside of the classroom, give faculty a chance to reflect on their assumptions about students, and ask them to consider how they might want to interact with students differently based on this experience.

## prototypes

- Jordan working on front-end prototypes
    - [google slides prototype](https://docs.google.com/presentation/d/e/2PACX-1vSon6Xf7wfb4G6DP9-qxzrr3n3d7k4Z0Rf7Ed82cOpnMMNtreB_0KuwR93qMzU3VcMYAfvzWjhFl6uC/pub?start=false&loop=false&delayms=600000&slide=id.p) and the [link to the editable slides](https://docs.google.com/presentation/d/1IGfP22eDnsQJviff3yJRAI4xUT2lvpoWgIPBmElMMus/edit#slide=id.p)
    - [the canva prototype](https://www.canva.com/design/DAFHhkq9lAg/Qcu7zZ48kKOFNu7oH-mjVA/view?website#1) and the [link to canva deck](https://www.canva.com/design/DAFHhkq9lAg/G871vR_PwoUfwPgPzbbD0Q/edit?utm_content=DAFHhkq9lAg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
    - [wix1](https://studio8768.wixsite.com/ll-project-upf-game)
    - [wix2](https://studio8768.wixsite.com/my-site)
- Marlon working on Airtable, Slack and Next
    - [airtable base](https://airtable.com/appSeA8Eg8PYc0KHx/tblTlaaQN44tdSOPz/viwNuwfSYHILP1R4w?blocks=hide)
    - link to [slack app repository](https://github.com/learninglab-studio/upf-game)
    - link to [nextjs repository](https://github.com/learninglab-studio/next-upf-game)


## microprojects

- [ll-microproject-slack-text-game](/oSnRaGcERim_YQSpzGSRWQ) is where we'll make an extremely basic "game engine" with Airtable and Slack
    - prototyping data models in Airtable
    - offering a play-testing environment in Slack driven by that Airtable data
    - go ahead and enter `git clone https://github.com/learninglab-studio/ll-text-game-bot.git` to get started
- [ll-microproject-initial-harvard-life-content-2-airtable](/TRMObKoBTU6f03pFFr5Dkw)
    - is where we'll throw in the text for the initial scenarios and slowly migrate it to Airtable


## To Do

- slack/airtable game engine prototyping
    - ~~create Airtable base~~
    - ~~create initial slash commands~~
    - ~~create prototype with show-your-work material~~
    - ~~enable app home~~
    - refactor to add levels
        - games have initial levels (or choice of levels/random levels)
        - levels have initial situations (or choice of situations/random situations)
        - levels can have prerequisites (situations just feed other situations and relate to each other along paths)
    - create game choices on app home
    - create basic app about
    - create args parser or initial format buttons for user to request modal, app home, DM or group message options (so that we can start testing these)
    - create group message
    - create modal
        - [update views in modal](https://api.slack.com/surfaces/modals/using#updating_views)
    - create multiple games in Airtable
    - create sessions table in Airtable and start creating them
    - create moves table in Airtable
    - create players in Airtable
    - explore [dialogues](https://api.slack.com/dialogs#dynamic_select_elements_external) which seem to be new?
    - ~~transfer initial content to Airtable~~
    - consult with team on final data model by 20220729
- front-end
    - do they want to just go with Episode if they like the look of it? :)
    - do we create an illustration for each? if so, how many is that? is Uzo around this year for a single-serving LLUF task?
    - 