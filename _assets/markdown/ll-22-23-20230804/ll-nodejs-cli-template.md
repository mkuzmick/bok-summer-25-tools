# ll-nodejs-cli-template

some notes (many from ChatGPT) on creating a simple nodejs command-line tool.

## Quick Start

We'll put a basic basic template on Github for you to easily clone and install with these commands:
```
# clone
git clone https://github.com/learninglab-studio/ll-template-for-node-cli.git
# then rename the folder either in finder or with
mv ll-template-for-node-cli my-new-tool-name
cd my-new-tool-name
npm install
npm link
code .
```
Just do that and you're ready to go on to the **Adding Features** section a little further down this page.

But if you want to build it entirely from scratch yourself (or just to have a deeper sense of how this tool works), keep reading the steps in the **Slow Start** section below.

## Slow Start

0. optional: create a Github repo with a nodejs `.gitignore` file and clone that for a simple way to set up the link between your tool's folder on your computer and your remote repository on Github. If you do this, your folder name will be determined by your repo's name, and you can skip step 1
1. create a folder for your project. Give it the name you'd like to give your tool or app.
    ```
    mkdir my-tool
    ```
2. change directories to get into the root of your project
    ```
    cd my-tool
    ```
3. initialize a node project with
    ```
    npm init
    ```
    you can go with blank entries and the defaults for all choices, but you are certainly free to type in your name as the author, to give a description of the app, etc. if you want. But you'll be able to change all of this quite easily later on if you wish, so the defaults are fine.
4. open the repository up in Visual Studio Code with
    ```
    code .
    ```
5. open the `package.json` file and add in a new `key: value` pair (or "property") by hitting enter after the line with `"main": "index.js"` and adding
    ```
    "bin": {
        "mycommand": "./bin/cli.js"
    }
    ```
    This means that when you type `mycommand` into terminal, the code in the file `./bin/cli.js` will run. You can put this file anywhere, and frequently people just put a single `cli.js` in the root folder. But we'll put it in a `/bin` folder where we'll store as many executable scripts as we might care to add (since developing such scripts is the point of this exercise).
6. now we need to create the `/bin` folder (in the root folder) and then the `cli.js` file in the `/bin` folder. Inside the `cli.js` file we'll add the following code:
    ```
    #! /usr/bin/env node
    console.log("I'm working on it...");
    ```
7. you can just type in `node ./bin/cli.js` to use node to run your script. But it's more elegantly first run `npm link` (which creates symbolic links between the keys and values in the `"bin"` portion of your `package.json`). Once you run `npm link` you SHOULD be able to just type `mycommand` in Terminal (or whatever word you chose for your command) and see the `I'm working on it...` output. Once you've done this you have the basic setup in place. If you are just learning js, this is a perfectly fine place to practice playing around with the basics of variables and objects and arrays and functions and loops, etc etc etc.
8. the next thing we want to be able to do is receive input from the user, and to do this we'll be installing our first npm package. Making sure that you are in the root of your app, type `npm i yargs`. Then add the following code to your `cli.js` file.
    ```
    const argv = require('yargs').argv;
    
    console.log(`starting my tool with these argv values:\n${JSON.stringify(argv, null, 4)}`)
    ```
9. 

## FAQ

### why "cli?" 

The term "CLI" stands for "Command-Line Interface," which encompasses both the application (or command) and the interface used to interact with it. However, it is true that the term "CLI" is often used ambiguously, referring to both the application and the interface interchangeably. This can lead to some confusion.

The reason for this ambiguity is that the term "CLI" has become colloquially accepted to refer to the overall concept of a command-line tool or program, including both the executable application and the interface used to interact with it. In everyday usage, people often refer to the entire entity as the "CLI," regardless of whether they are specifically referring to the application or the interface.

It's important to note that this ambiguity primarily exists in informal conversations and discussions. In more technical or precise contexts, people may differentiate between the "CLI application" and the "CLI interface" to avoid confusion. However, in general conversations, the term "CLI" is commonly used to refer to the complete package, combining the application and the interface.

To mitigate any confusion, it's always a good idea to provide additional context or clarify the specific aspect you're referring to when discussing CLI-related topics.


### what's the difference between `npm link` & `npm install -g`

When creating a Node.js CLI (Command-Line Interface) application, you have a couple of options to make your command executable globally. The two common approaches are using `npm link` and `npm install -g`. While they achieve a similar outcome, there are some differences between them.

1. **npm link**: This command creates a symbolic link between your CLI project and the global `node_modules` directory. Here's how it works:

   - First, navigate to your CLI project's directory in the terminal.
   - Run `npm link`. This creates a symbolic link to your project in the global `node_modules` directory.
   - Now, you can use your CLI command as if it were installed globally. It's accessible from anywhere in the terminal.

   The advantage of using `npm link` is that it allows you to make changes to your CLI project and see the updates immediately without the need to reinstall it each time. It's particularly useful during development when you're actively working on the CLI.

2. **npm install -g**: This command installs your CLI globally by placing it in the global `node_modules` directory.

   - In your CLI project's directory, run `npm install -g`. This installs your CLI globally, making it accessible from anywhere in the terminal.
   
   When you use `npm install -g`, it installs a copy of your CLI project in the global `node_modules` directory, just like any other globally installed package. Any changes you make to your CLI project will require reinstalling it using `npm install -g` to reflect the updates.

In summary, the main difference between `npm link` and `npm install -g` is that `npm link` creates a symbolic link between your CLI project and the global `node_modules` directory, allowing you to see immediate changes during development. On the other hand, `npm install -g` installs a copy of your CLI project globally, requiring reinstallation for any updates.

### why `bin` if the folder doesn't contain binary files?

You are correct that in the case of JavaScript-based command-line tools, the term "binary" in the "bin" folder does not necessarily refer to compiled binary files. Instead, it typically refers to executable JavaScript files, which are often interpreted rather than compiled.

The naming convention of using a "bin" folder, even for JavaScript files, can be seen as a historical artifact and a convention that has been widely adopted to maintain consistency and compatibility with existing practices. It helps to provide a dedicated location for executable files within the project structure and aligns with the expectations of users who are familiar with the traditional "bin" folder for storing executables.

In the context of JavaScript-based command-line tools, the "bin" folder often contains JavaScript files (e.g., `cli.js` or `index.js`) that serve as the entry points for the command-line interface. These files can be executed directly using the appropriate interpreter (such as Node.js) to run the command-line tool.

While the files stored in the "bin" folder may not be true binary files, the convention of using the "bin" folder still persists as a common and recognizable pattern in the development community, making it easier for users to locate and execute the command-line tool regardless of the underlying implementation.