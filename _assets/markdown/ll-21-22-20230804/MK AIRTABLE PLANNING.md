# MK AIRTABLE PLANNING


- The Work Base
    - Inbox
    - Projects
    - Tasks
- The Show Your Work Base
    - Work
    - Shows
    - Happenings
    - _REFERENCE
        - _EVENTS
        - _RESOURCES
- TheOntology
    - People
    - Projects
    - Partners
    - Labs
    - Tools
    - Forms (Mediums, Modes, Moves, Genres)
    - _REFERENCE
        - _BOK_PEOPLE
        - _BOK_COURSES
        - _BOK_UNITS
- IngestBase
    - Videos
    - Stills
- MediaWork
- TheResourceBase
- AssetBase
- EventCatcher
- Equipment



## CARDS AND MORE

* project card
* task card
* person card
* show your work card
* resource card
* daily menu
* personal menu/trajectory
* shoot report
* 


## THE WORK BASE

- workBase goals
    - have kanbans for sorting tasks
        - one mk
        - one LL
    - meetings where single-action-items get figured out and assigned
    - printouts for individuals
    - mainly I want to be able to 
        - distribute tasks
        - track projects
        - produce reports
    - essential elements
        - list of projects that's printable
        - list of milestones for the projects
        - list of parts for the projects (tasks)
        - list of works done for the projects (works)
        - list of collections of work
    - elements that would be good
        - personalized tasklists, generated from json or markdown and handed out
        - menu for the day
        - menu for the week
        - physical kanban board from Airtable-generated cards
        - slack integration for task generation
        - inbox management
        - friday strategic meetings
        - just having an inbox
        - document links and tracking
        - kanban in airtable
        - show your works
        - mk end comments and reflections
        - lab reports
        - link and url tracking
        - project reports/charters/docs for printing and tracking
        - project posters
        - project review at intervals
        - milestone tracking
        - piece of work tracking
        - resources and resource tracking
- TheWorkBase structure




## THE SHOW BASE

- TheShowBase structure
    - shows
        - link to work
        - markdown, essentially
        - names and projects (lookup from Work?)
        - manual overrides
    - playlists
        - collections for for random purposes
        - by name, curated
        - by lab, curated
        - by project, curated (be able to identify first or meta or intro-show?)


## THE RESOURCE BASE

- TheResourceBase
    - NotQuitePinterestBut
    - Resources
        - Link to thing
        - Link to Markdown?
        - Markdown
        - MainImage
        - Images
    - Lists and Sorts
        - by course
        - by lab
        - by person, etc.
        - maybe some of this gets sent over to shows?
    - other?
        - assets if not its own base?

## MEDIA BASES

- TheIngestBase
- TheAssetBase
    - should assets join resources?
- 


### AIRTABLE SCRIPTING NOTES

#### GET RECORD BY ID
```
let table = base.getTable('Table 1');
let query = await table.selectRecordsAsync();
let record = query.getRecord(recordId);
console.log(record.getCellValue('Name'));
```
#### SELECT RECORDS FROM VIEW
```
// query for every record in "By Project"
let table = base.getTable("People");
let view = table.getView("By Project");
let query = await view.selectRecordsAsync();
console.log(query);

```
#### RUNNING A SCRIPT WITH A BUTTON FIELD
```
// Change these to match your base.
let table = base.getTable('Table name');
let field = table.getField('Field name');

// When run from a button field, the script skips the prompt
// and automatically uses the button's record.
let record = await input.recordAsync('Choose a record', table);

let cellValue = record.getCellValue(field);
output.markdown(`# You have selected ${value}.`);
```