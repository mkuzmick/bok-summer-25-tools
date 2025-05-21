---
tags: mk, resources
---

# mk-resource-airtable-scripting

here are some basic steps to get you started.

## getting started with js

If you have NEVER used javascript before, start here. If you have loads of experience, skip this. If you are unsure, maybe skim it? (If you have experience and are generous--maybe help us write it? :)

### why learn js?

You have probably heard that there many computer languages out there, and you may well be asking "should I learn to code by starting with javascript? or python? or r? or c? or c#? or . . . "

If you are at all worried about this, don't be worried. Everything we learn to do when writing javascript for Airtable is going to be broadly applicable. These languages differ from each other WAY less than English and Japanese differ from each other, for instance. It's actually a little more like the way that the "MLA" citation method differs from the "APA" or "Chicago Manual of Style" methods differ from each other. 

But even if you are stressed about choosing the "right" language, JS is NOT a bad choice at all. If you check out any of the [polls of developers](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers) or [employers & job ads](https://bootcamp.berkeley.edu/blog/most-in-demand-programming-languages/) you'll see that JS ranks RIGHT at the top, along with Python. You'd be in great shape starting with either! Python may be a little more helpful in your life as a scientist or big-data social scientist; JS may be a little more helpful if you hope to make things for the web or join a code-centric startup.

But seriously--don't stress about this.

Next up, we should note that writing js in Airtable is just a LITTLE bit different from writing it for websites or the servers that send users those websites. So in what follows we'll point out some of the quirks of Airtable scripting here and there. 

Anyway--let's get started.

### adding a scripting app to Airtable

To get started writing some code, we need to open up an Airtable base and add an "App" by 
* clicking the "Apps" icon on the right hand side of the screen and 
* then clicking "Add an app"
* then clicking "Scripting" and "Add App"
* then delete all the sample code that you start with (we're going to focus on js alone WITHOUT worrying about Airtable for now)

Now we're ready to go! All we need to do is type a little code in the left-hand pane, click "Run," and then we'll see the result on the right.

### variables

Let's start by learning about variables.

To define our first couple of variables. We'll do this by typing in `let myVariable = "my value"`, where `myVariable` is just any old name we come up with for the variable, and `"my value"` is the value we're storing in the variable. If we want to SEE the values of the variables, we use a method called `output.text` to do this. Like if we want to see the contents of `myVariable`, we'd type in `output.text(myVariable)`.

If you put all this together, you should be able to enter in a few lines like the following.

```
let myName = "Taylor"
let myAlbum = "1989"
let myFavoriteYear = 1989

output.text(myName)
output.text(myAlbum)
output.text(myFavoriteYear)
```
- note that we use "camel case" for the variable's name--NO SPACES are allowed, so we shove all the words together and just use capital letters to indicate when a new word starts. 
- also note also that we store "strings" in quotes, and numbers without quotes.

### working with strings

Now it's important to note that the data stored in `myAlbum` and `myFavoriteYear` is different (string vs number), and we can see that if we add the following

```
output.text(myAlbum + 1)
output.text(myFavoriteYear + 1)
```

This result may be intuitive to you---if we add 1 to a string, the assumption is that we're adding the CHARACTER ``"1"``, so we get `"19891"`, but if we add the NUMBER 1 to another NUMBER, then we get `1990`.

Many many people use this `+` to put strings together in js, like

```
output.text("my favorite album is " + myAlbum + " and my favorite year is " + myFavoriteYear)
```

but this can get annoying with really complex string operations, so what you'll more frequently see in Airtable community scripts is the use of "template" strings, enclosed in backticks with `${ }` to throw js variables and expressions in. To redo the above string with template strings, we'd write

```
output.text(`my favorite album is ${myAlbum} and my favorite year is ${myFavoriteYear}`)
```





### arrays

Variables can contain things other than numbers and strings too.

For instance, we can store a list of things--or an "array"--if we use square brackets and some commas to separate the elements of our list. Then we'll use the same square brackets to access the various elements of the list when we need them, like so:

```
let myList = ["Red", "1989", "evermore", "Folklore"]
let myFavoriteAlbum = myList[1]

output.text(myFavoriteAlbum)
```

This defines `myList` as an array of strings, and then we ask for ONE of these strings with `myList[1]`. The one quirky thing here is that we get the SECOND element of the array with `[1]`. This is because arrays are "zero-indexed", which means that the first element is numbered `0`, the second `1`, and so on. Try to add some extra elements to your array and see if you can grab a hold of the various values at will.

We can do many many more things with arrays (add to them, split them, iterate through them, etc)--but we'll have to wait on that for now.

### objects

[someone can add this in?]


### loops

[for loops OK, but definitely do `forEach` too because this is what's most common in the Airtable community scripts]

### conditionals

(also add booleans in here if we don't above)

### functions & methods

[show functions, then explain how the word method is different, prepping them for the methods of the global variables in the Airtable API]

## our first Airtable script

If the above js basics make sense to you, it's time to start working on Airtable scripting.

Open up [this pokemon base](https://airtable.com/appth36TTWdbUXOPx?) (or any base you'd like to work in) and create yourself a duplicate. Then click "add an app" on the right hand side and select "Scripting."

### finding the API's variables and methods

Airtable's scripting block has a number of built in variables and methods you can use to access the data. It can sometimes seem intimidating looking at other people's scripts because they seem to magically know all of these methods already, and because there seems to be an almost infinite number of them. Don't worry--it seems this way to everyone when encountering a new API.

If you want to know how to discover these things on your own, you can click the "API" tab you see towards the middle of the bottom of your scripting interface [NOTE: let's insert a photo]. There you can read over ALL the variables and methods available to you. 

For instance, on the front page of the API docs it says there are a bunch of "global variables" (variables you can use anywhere in your script without having to define them yourself): `base`, `cursor`, `session`, `input`, `output`, `fetch`.

Let's try to get a feel for what these variables contain by inspecting them.

```
output.inspect(base)
output.inspect(cursor)
output.inspect(input)
output.inspect(output)
// etc
```

Go ahead and poke around in these variables to get a sense of what's there. Check out the `cursor` for instance, and see if you can see the `activeTableId` and `activeViewId`--if you look at the really-long-and-hard-to-parse URL in your browser's location bar, can we see them in there anywhere? (The first three chunks that come after `airtable.com` can all be found in the output you see in your console---see if you can figure out the URL structure!)

We can learn a certain amount about the structure of these variables by inspecting them, but we really need to look at the docs if we want to understand all the details.

Let's start with input and output.

### input and output

We've already been doing a fair bit with the various output methods, but if you want to see them all in one place, look [here](https://www.airtable.com/developers/scripting/api/output). The key ones to know are
- `output.text`, which is great for unformatted text--especially useful for logging things as you build your script
- `output.markdown`, which will take any markdown text and display it as formatted text with images, etc
- `output.inspect`, which is nice for inspecting complex data-types like objects and arrays
- `output.table`, which is maybe useful if you want a user to see an array of objects as something less intimidating than what you get with the inspector

If there are any of these that you *haven't* tried yet, go ahead and do that before moving on to input.

For [input](https://www.airtable.com/developers/scripting/api/input), we have additional methods:
- `input.textAsync` 
- `input.buttonsAsync`
- `input.tableAsync`
- `input.viewAsync`
- `input.fieldAsync`
- `input.recordAsync`
- `input.fileAsync`
- `input.config`

Each of these methods takes in at least one argument, the first of which is the prompt that the user will see. And each allows us to store the user's input in a variable. The one trick is that we have to `await` that input, because we don't want to move along to the next lines of the script until we get that input from the user.

So try flavors of the following and see what happens:

#### simple text input
```
let name = await input.textAsync('What is your name?');
output.text(`Your name is ${name}.`);
```

#### selecting tables, views and records:

```
let table = await input.tableAsync("Select a table")
output.inspect(table)
let view = await input.viewAsync('Pick a view', table)
output.inspect(view)
let record = await input.recordAsync('Now pick a record', view)
output.inspect(record)
```

#### buttons

[replace this with our own example]
```
let catOrDog = await input.buttonsAsync('Cats or dogs?', ['Cats!', 'Dogs!']);
if (catOrDog === 'Cats!') {
    output.text('Meow');
} else {
    output.text('Woof');
}
```

### working with records

As you inspect the records you receive in the scripts above, you may be wondering why we only see the `id` and `name` properties (and it's actually a little annoying--if you use the Web API to retrieve a record you get ALL the data for a record right away).

To access the record's various values we need to use the `getCellValue` method, like so:

```
let table = await input.tableAsync("Select a table")
output.inspect(table)
let view = await input.viewAsync('Pick a view', table)
output.inspect(view)
let record = await input.recordAsync('Now pick a record', view)
output.inspect(record)
output.inspect(record.getCellValue("MyFieldName"))
```

If you begin to get annoyed by having to select tables and views every single time, go ahead and define them in the script for testing purposes:

```
let table = base.getTable("MyTable")
let view = table.getView("MyView")
let record = await input.recordAsync("Pick a record", view)
```

As you inspect the values for different fields, you'll discover that they are different types of data, which means that sometimes `output.text` won't work (for instance if the value of the cell is actuall a list of images).

You can continue to use `output.inspect` for testing purposes, but if you want to DO something with the values you care about (like the image URLs or the recordIDs for other records your record links to), you'll need to find a way to grab and manipulate those values.

### handling an array of image attachments

If you are working in the [Pokemon Base](https://airtable.com/appth36TTWdbUXOPx?), you'll find a field in the `Pokémon` table called `Sprites` that has a bunch of images in it, but you can perform this chunk of the tutorial with any table that has an image attachments field (you'll just have to change the names of the tables and fields).

Let's invite the user to choose a Pokémon and then render out a markdown page with embedded images. Try to do as much of this as you can on your own!

First, to get the Pokémon, we need to get the table and the record

```
let table = base.getTable("Pokémon");
let view = table.getView("All");
let record = await input.recordAsync('Pick a record', view);
```

Choose a Pokémon that has multiple images and then let's inspect the "Sprites" field to see what's in there.

```
// keep everything above, then add
let images = record.getCellValue("Sprites")
output.inspect(images)
```

(We can, of course, just `output.inspect(record.getCellValue("Sprites"))`, but that `images` variable may make it a little easier for us to grasp what the code is doing)

If we TRY to `output.text` those `images` it will fail, because they AREN'T text. But we CAN find the little chunks of text within the image objects. Let's start tunneling down into `images[0]` (the first in the array) to try to grab a hold of the text we need.

```
output.text(images[0].height)
output.text(images[0].url)
// etc.
```

To get the formatted markdown for the image, all we need to do is

```
output.markdown(`## ${record.getCellValue("Name")}`)
output.markdown(`![alt text](${images[0].url})`)
```

Our next challenge is to get all of the images (no matter how many there are), and to do this, we'll do a `forEach` loop:

```
images.forEach(image => {
    output.markdown(`![](${image.url})`)
})
```

## doing something useful

OK. So we what can we do that's actually useful? 

Well, one thing we often need to do in the LL is to quickly compile markdown docs from resources we have stored in Airtable. This could be MK pulling together a digital handout for a workshop by selecting 2-3 resources on podcasting and 3-4 models; it could be JK writing a report on a LLUF, needing to pull together a list of the most interesting things they made this term.

Now we know how to loop through the thumbnails in a given record's attachments field, but what if we have something like a "Playlist" or "Collection" of records that **reference** records in another table? Like if there's a `People` table and I want to get the markdown for all the photos of a specific person (all of which are stored in a separate `Photos` table)?

Well--let's try to create our own version of this problem by adding a `Playlists` table and a couple of `Playlists` to the Pokemon base.

Each `Playlist` will have a `Title` and will reference a bunch of pokemon in the `Pokemon` table.

