# resource-airtable-scripting

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

Now it's important to note that the data stored in `myAlbum` and `myFavoriteYear` is different, and we can see that if we add the following

```
output.text(myAlbum + 1)
output.text(myFavoriteYear + 1)
```
This result may be intuitive to you---if we add 1 to a string, the assumption is that we're adding the CHARaCTER ``"1"``, so we get `"19891"`, but if we add the NUMBER 1 to another NUMBER, then we get `1990`.

Note that we use "camel case" for the variable--NO SPACES are allowed, so we shove all the words together and just use capital letters to indicate when a new word starts. Note also that we store "strings" in quotes, and numbers without quotes.

### arrays

Variables can contain things other than numbers and strings too.

For instance, we can store a list of things--or an "array"--if we use square brackets and some commas to separate the elements of our list. Then we'll use the same square brackets to access the various elements of the list when we need them, like so:

```
let myList = ["Red", "1989", "evermore", "Folklore"]

output.text(myList[1])
```

This defines `myList` as an array of strings, and then we ask for ONE of these strings with `myList[1]`. The one quirky thing here is that we get the SECOND element of the array with `[1]`. This is because arrays are "zero-indexed", which means that the first element is numbered `0`, the second `1`, and so on. Try to add some extra elements to your array and see if you can grab a hold of the various values at will.

We can do many many more things with arrays (add to them, split them, iterate through them, etc)--but we'll have to wait on that for now.

### objects

[someone can add this in?]


### loops


### conditionals

(also add booleans in here if we don't above)

### functions


## our first Airtable script

Open up [this pokemon base](https://airtable.com/appth36TTWdbUXOPx?) (or any base you'd like to work in) and create yourself a duplicate. Then click "add an app" on the right hand side and select "Scripting."

For our first script, let's
- define the table we want to work with
- define the view we want to work with in that table
- invite the user to select a pokemon from that view
- confirm that we've found the right record by printing out the name of the pokemon for the user
```
let table = base.getTable("Pokémon");
let view = table.getView("All");
let record = await input.recordAsync('Pick a record', view);
if (record) {
    output.text(`You picked ${record.getCellValueAsString("Name")}`);
}
```
Go ahead and copy and paste this in, but do take a second to make sure you understand each and every line. If anything at all is obscure, ask someone in the LL with a little js knowledge.

Even if you have a bit of a coding background, you may find a couple of things a little confusing (or even aggravating!)

For one thing, even though we've grabbed on to the record and stored it in the `record` variable, we can't just get the `Name` property with `record.Name` as we might expect, but, instead, have to use the `getCellValueAsString` method. (NOTE: we actually DON'T have to do this when using the Airtable API, so if you understand enough about coding and are set enough in your tastes to be aggravated by this, you may just want to write a little node.js script instead of messing with the Airtable scripting block)

But let's keep going here. Let's try to figure out how to access all the other fields in the record, and let's send them to the user in some different ways.

```
output.text(`You picked ${record.getCellValueAsString("Name")}`);
output.inspect(record)
output.table(record)
output.markdown(`# ${record.name}`)
```
Try this--it should work.

But what **won't** work is this

```
output.text(record.getCellValue("Sprites"))
```
The `Sprites` field is actually full of images, and not just one. So Airtable can't figure out what to show you if wants to show you a bunch of images and you've asked for text. 

You **will** be able to see them all as text if you do this

```
output.text(record.getCellValueAsString("Sprites"))
```
But what's even better (if you want to get a solid sense of how the data is structured) is to go with
```
output.inspect(record.getCellValue("Sprites"))
```
This will allow you to dig down into the data structure by clicking the little disclosure triangles you'll see in the console. Try clicking away at these triangles to check out all the data associated with each image. You may even try to log out some of the data with `output.text`--and it's a good idea to try this for a bit if you are new to js arrays and objects. Like if you are choosing a record with multiple images, try to get the `height` of the second object in the list (the object with an index of `1`). 

The answer?

```
output.markdown(`![](${record.getCellValue("Sprites")[0].url})`)
```

Note, this will NOT work if there is only one image in the list--does this make sense?

A good challenge at this stage is to try to all of the images to some markdown with a little loop and string-substitution

The answer?

```
record.getCellValue("Sprites").forEach(sprite => {
    output.markdown(`![](${sprite.url})`)
})
```

## doing something useful

OK. So we what can we do that's actually useful? 

Well, one thing we often need to do in the LL is to quickly compile markdown docs from resources we have stored in Airtable. This could be MK pulling together a digital handout for a workshop by selecting 2-3 resources on podcasting and 3-4 models; it could be JK writing a report on a LLUF, needing to pull together a list of the most interesting things they made this term.

Now we know how to loop through the thumbnails in a given record's attachments field, but what if we have something like a "Playlist" or "Collection" of records that **reference** records in another table? Like if there's a `People` table and I want to get the markdown for all the photos of a specific person (all of which are stored in a separate `Photos` table)?

Well--let's try to create our own version of this problem by adding a `Playlists` table and a couple of `Playlists` to the Pokemon base.

Each `Playlist` will have a `Title` and will reference a bunch of pokemon in the `Pokemon` table.

