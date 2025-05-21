---
tags: projects, codelab, code, essentials
---

# codelab 2022 basics

let's take notes here! (and put a repo [here](https://github.com/learninglab-studio/ll-basics) and an airtable [here](https://airtable.com/apprSmdoCbtfnsGwY/tblRt2AhtAF5jCErN/viwLICwUdijwbnRU1?blocks=hide))

## setting up the basic tools

This isn't the *most* exciting way to start (and if we were teaching students we might do something quicker like a [codepen](https://codepen.io/)), but it's the best way to get connected to the actual stuff we're going to build (and to make sure your machine and various logins are all ready to go).

So here are the basic things we need.

### Terminal

We are going to need to get familiar with the Terminal, which you can find in your Applications => Utilities folder (or with spotlight by hitting command+space and then typing in the first few letters of the app's name).

We don't need to know too many commands for right now, but you should at least get the hang of finding your way around the folder structure of your machine, so try the following:

* type in `ls` and hit return. You'll see a list of all of all the files in your home directory
* now get to the Desktop by entering `cd Desktop` and then try `ls again`
* to get back to the home directory you can type `cd ..` and it will take you "up" one level in your tree. 
* try navigating around a little to get the hang of this. If you ever get "lost," you can use `cd ~` to get back to your home directory from wherever you are (and you can use `cd ~/Desktop` to get to your Desktop from wherever you are, `cd ~/Downloads` to get to your Downloads, etc)
* in the LL, we are typically going to store our code in a `Developer` or `Development` folder. If you don't have your own, you can create it by navigating to your home folder (`cd ~`) and then entering `mkdir Development`
* go ahead and `cd Development` to get into that folder and you're done


### Homebrew, Git, Node, and VSCode

On Macs, by FAR the easiest way of installing things is [homebrew](https://brew.sh/). Which you can install with the command you'll find at [brew.sh](https://brew.sh/):

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

On newer macs you may need to run an additional command at this point--you'll see it at the bottom of the logs that the homebrew install prints out in your terminal.

```
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/yellow/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Now you're ready to start installing the key things you need:

1. `brew install git` typically comes first for us, because once this is installed we can easily grab bits of code from our github repositories
2. `brew install visual-studio-code` can come next, because you'll use it to actually write your code (and to view the code that you clone with `git`)
3. `brew install node` is pretty important for us, because most of what we'll be coding in the LL will use [nodejs](https://nodejs.dev/).

### Cloning your first repository

1. Make SURE that you are in your `~/Development` folder 
2. then go ahead and enter `git clone https://github.com/learninglab-studio/ll-basics.git` to clone our basics repository. If you type `ls` you should see it, and if you type `cd ll-basics` you'll be able to get into the folder.
3. once in the folder, type `code .` which is a command you can use to open up *any* folder in Visual Studio Code


### Writing a basic script

There will already be a basic script in `ll.js`. But let's start a brand new one.

* start by creating a new file and saving it with a `.js` extension to mark the fact that it will be a javascript file. It's conventional to call your main command-line script `cli.js`, but you can really call it anything (but in the text that follows, we'll be using `cli.js` as the name of the file, so you'll have to remember to swap in your own name each time if you do your own thing).


first
`console.log("hello")`

then run it with `node cli.js`

then
```
for (let i = 0; i < 5; i++) {
    console.log(`hello`)
}
```

then
```
var names = ["Marlon", "Christine", "Luke"]

for (let i = 0; i < 4; i++) {
    console.log(names[i])
}
```

then
```
var names = ["Marlon", "Christine", "Luke"]

for (let i = 0; i < names.length; i++) {
    console.log(`hello ${names[i]}`)
}
```

then 

```
var person = { name: "Taylor", nationality: "American" }
var album = { title: "1989", yearReleased: 2014 }
var songs = ["Welcome to New York", "Blank Space", "Style"]


console.log(album.title + 1)
console.log(album.yearReleased + 1)
console.log(person.name)
console.log(`${album.title} came out in ${album.yearReleased}`)
```

then

```
var complexPerson = { 
    name: "Taylor", 
    nationality: "American", 
    albums: [
        { 
            title: "1989", 
            yearReleased: 2014,
            songs: [
                "Welcome to New York", 
                "Blank Space", 
                "Style" 
            ]
        },
        { 
            title: "evermore", 
            yearReleased: 2020,
            songs: [
                "willow", 
                "champagne problems", 
                "gold rush" 
            ]
        }
]}
```

