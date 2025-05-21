# microproject-custom-timeline-views

## how to

To create a custom timeline view, head in to the `ShowYourImages` table of the `_the-show-your-work-base-22.1` [here](https://airtable.com/appXOcPzK7Qvb1Vam/tbl2wM6PlTj0kHTZj/viw5HlKQe7XEgVnAI?blocks=hide) and create a view. Make sure that it's a [valid URL query string](https://stackoverflow.com/questions/13373504/what-is-a-valid-url-query-string/13373573#:~:text=In%20particular%2C%20encoding%20the%20query,or%20%20%5Bcitation%20needed%5D) (no spaces or "weird" characters . . . underscores and hyphens are great for separating words). Then the URL you head to in the browse will follow this pattern:

`https://ll-timeline-machine.herokuapp.com/show/customview/TABLE/VIEW`
In principle this will work with any table in this base, but you'll need to have fields for
* `CreatedTs`
* `SlackURL` 
* `PostedBySlackUser`
* `Title` 
* `Text`

So if you create a view called `MDF_WEEKLY_MEETING` the url will be `https://ll-timeline-machine.herokuapp.com/show/customview/ShowYourImages/MDF_WEEKLY_MEETING`. You can see this timeline [here](https://ll-timeline-machine.herokuapp.com/show/customview/ShowYourImages/MDF_WEEKLY_MEETING).

If you want to embed a timeline in your hackmd doc (on on any site that lets you add html), the basic code pattern looks like this:

```
<iframe src="https://ll-timeline-machine.herokuapp.com/show/customview/ShowYourImages/MDF_WEEKLY_MEETING" width="100%" height="800px" frameborder="2"></iframe>
```

And that produces this:

<iframe src="https://ll-timeline-machine.herokuapp.com/show/customview/ShowYourImages/MDF_WEEKLY_MEETING" width="100%" height="800px" frameborder="2"></iframe>

## code

Just in case anyone wants to see how this route works, here's the code that handles custom timeline view requests.

In Express apps, you "listen" for certain url patterns that hit your server, then you create some html to send back in response.

The "listening" part looks like this:

```
router.get('show/customview/:table/:view', renderViewTimeline);
```

Whenever someone types in 
```
show/customview/SOMETHING/SOMETHING-ELSE
```
We'll look in table `SOMETHING` for a view named `SOMETHING-ELSE`, then we'll fire the function `renderViewTimeline`.

Here's what that function looks like:

```
async function renderViewTimeline (req, res, next){
    const atResult = await llAt.findMany({
        baseId: process.env.AIRTABLE_SHOW_BASE,
        table: req.params.table,
        view: req.params.view,
        maxRecords: 100
    })
    var timelineJson = {
        events: []
    }
    for (let i = 0; i < atResult.length; i++) {
        const element = atResult[i];
        timelineJson.events.push(makeEvent(element))
    }
    res.render('timeline', {
        title: `timeline for ${req.params.table}`,
        message: "",
        timeline_json: timelineJson
    })
}
```
It sends an API request to airtable with a function called `llAt.findMany`, and it stores the result in a variable called `atResult`. If you look at the parameters sent in the API request, you'll see that the value for `table` is the `table` parameter of the user's request (`req.params.table`) and that the view we specify is the `view` the user specified in the very last segment of the URL they typed into their browser.

Once we have that result from Airtable, we loop through the records we get back and transform each into a valid timeline.js event with the `makeEvent` function. We store all of these events in an `events` array in our `timelineJson` object, we transform this into HTML by passing this object along to the `res.render` function, saying that we want to use the `timeline` template (defined elsewhere in a `timeline.ejs` doc).

The `makeEvent` function is simple, and it will help you get a sense of how we map certain Airtable fields to the values that the timeline.js JSON specs require ([outlined in their docs here](https://timeline.knightlab.com/docs/json-format.html)).

```
function makeEvent(imageRecord) {
    const createdDate = new Date(imageRecord.fields.CreatedTs)
    var revisedEvent = {
        "media": {
            "url": imageRecord.fields.SlackUrl ? imageRecord.fields.SlackUrl : placeholderImage,
            "caption": `posted by ${imageRecord.fields.PostedBySlackUser}`,
            // "credit": `posted by ${imageRecord.fields.PostedBySlackUser}`
        },
        "start_date": {
            "second": createdDate.getSeconds(),
            "minute": createdDate.getMinutes(),
            "hour": createdDate.getHours(),
            "month": (createdDate.getMonth()+1),
            "day": createdDate.getDate(),
            "year": createdDate.getFullYear(),
        },
        "text": {
            "headline": imageRecord.fields.Title,
            "text": imageRecord.fields.Text
        }
    }
    return revisedEvent
}
```

## next steps

* If anyone would like to work on adding this to additional airtable bases (creating a route that listens for baseIDs, say), that would be fun and relatively easy.
* If anyone wants to augment currently existing images with `Title` and `Text` fields, that will make the timeline more impressive (and you could create a simple `HAS_TEXT` view that filters out images that DON'T have text)