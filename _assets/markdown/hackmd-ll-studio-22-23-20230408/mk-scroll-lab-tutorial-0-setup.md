---
tags: mk
---


# mk-scroll-lab-tutorial-0-setup

## set up your development environment

We have other tutorials on this, so to make a long story short, you should have

1. [homebrew](https://brew.sh/) installed `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. visual studio code installed (`brew install visual-studio-code`)
3. node installed (`brew install node`)
4. git installed (`brew install git`)
5. a `~/Development` folder to put your code in
6. a Github account (optional: needed if you want to use Github to store and share your code and to collaborate with others)
7. a Vercel account (optional: needed if you want the simplest way to put a Next app on the web)

All of this takes a little while to do, so it definitely helps if you go ahead and do this part on your own (preferably when doing something else like watching Netflix, because you'll be spending some time waiting for some of these installs to complete).

## start up your Next.js app

In terminal, navigate to your Development folder. From its parent folder (probably your Home folder), that would be
```
cd Development
``` 

Then start up a [Next.js](https://nextjs.org/) app with

```
npx create-next-app my-scroll-lab-workbook
```

You can call it anything you'd like (other than `my-scroll-lab-workbook`), but whatever you enter there will show up as a folder containing your starter NextJS app. So change directories into it
```
cd my-scroll-lab-workbook
```
open it in vs code
```
code .
```
This command will open the current directory in vs code (make sure you were in the app rather than the Development folder). Once it's open, go back to the terminal command and hit `command` and `T` together to open up a new tab in the root of your app. In either of the two tabs, type the following to start the development server.
```
npm run dev
```
Once you do this, you should be able to go to [localhost:3000](http://localhost:3000/).

## optional Github and Vercel integration

If you just can't wait to put your app on the web, here's how to do it.

Head over to Github and create an account if you don't already have one. Then create a new repository, giving it the same name as your Next app (for us that will be `my-scroll-lab-workbook`). Don't bother adding a `.gitignore` or a license or a `README.md` or anything else they offer, as all of these already exist in our Next app.

Once you create it, it should take you to the **"Quick Setup"** page, and if you scroll down to **"…or push an existing repository from the command line"** you'll see the code we want:

```
git remote add origin https://github.com/your-github-account-name/my-scroll-lab-workbook.git
git branch -M main
git push -u origin main
```
Next:
- hit the copy button on this code (in Github, NOT HERE because your user account will be different)
- navigate to the root folder of your project in terminal (very important! you should already be there if you just finished all the steps above)
- paste this code in to your Terminal
- hit `return` and you're done
You should now be able to navigate to the repository's page on Github and see your starter Next project's code right there.

NOTE: if you have never signed in to Github in your Terminal, you'll need to do that, and it's become a little more quirky in the last year. You still enter your Github username or email, but the password will NOT be the password you use to log in to Github. Instead, you'll need to create a "Personal Access Token" following the steps below:

1. log in to Github.com
2. click your User icon in the top right of the page and select "Settings"
3. scroll all the way down on that page until you see "Developer Settings" all the way at the bottom of the left sidebar. Select it.
4. Then click "Personal Access Tokens" at the bottom of the left sidebar
5. Then click the "Generate New Token" button
6. You may have to enter your password again at this point
7. Give the token a name/note
8. Change expiration to some reasonable number of days (for the term, say)
9. Check at least the repo, gist and project checkboxes and create the token
10. Make sure to copy the token---you can always create another one, but you'd have to do all the above again
11. Paste that token in as your password in Terminal

To get your app up on the web as an actual webpage (rather than just the repository) you'll need to go create an account at [Vercel](https://vercel.com). Head over there and create an account--it's easiest if you choose to log in with Github, because we'll also be giving Vercel access to each Github repository that we want it to host as a web app.

Once you have an account
1. in the [Dashboard](https://vercel.com/dashboard) click "Add new" and select "Project"
2. select "Continue with Github" and you'll be invited to import a git repository. Go ahead and select `my-scroll-lab-workbook` or whatever you chose to call it.
3. you don't actually need to change any of the settings just yet (later in this tutorial series we'll add environment variables, but you probably don't have these on you just yet)
4. just click "Deploy" and Vercel will start working at building your app. If you really want to see what it's doing, hit the disclosure triangle next to "Building" and you'll see the logs it's producing as it builds your app.
5. When it's done you'll see a "Congratulations" page (only the first time they build it), and then you can head to the Dashboard. This is where you can change settings, add environment variables, add your own custom URL, etc. But for now just go ahead and click on the link to your site and you should be able to see the template there.

That's it. You're all set with the basic template. Now we're going to tweak it a bit to make it easier to learn with.

## touring and simplifying the next app

You are welcome to play around randomly in the Next.js starter template for a bit, changing values here and there to see how it works. But to continue with this tutorial we are actually going to simplify the project quite a bit to make it easier for us to grasp everything that's going on in our app.

Let's change a few things, file by file.

### /pages/index.js

In the `/pages` folder we're going to put a whole bunch of `.js` files that will turn into separate webpages or api routesin our app. Right now, there are three files in there: 

- `_app.js` is one we're not going to touch for now--it wraps the entire site, so anything we want to apply across the entire site (like global styles) will get hooked up there
- `/api/hello.js` is an example of an api route--we'll work in this zone much much later
- `index.js` is the homepage, the one we see at the `/` route . . . that's the one we'll change right now.

Let's simplify the page dramatically:

```
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scroll Lab Workbook</title>
        <meta name="description" content="A place to try out scrollytelling with code." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
         scroll lab workbook
        </h1>
      </main>
      <footer className={styles.footer}>
        <span>links will go here</span>
      </footer>
    </div>
  )
}

```

1. Inside the `<title>` tags you can put the title of your site/page, this will show up in the browser tab (among other places) as the title of your page
2. Put a simple title for your project between the `<h1>` tags
3. Ultimately, when we build other pages, we'll put links to them in the footer so it's easy for us to find them.

### styles

Right now there are two style sheets having effects on our main page. The `/styles/globals.css` is imported in our `_app.js` file. There's not much here, but let's get rid of the dark-mode handler. Delete the following:

```
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
}
```

The other sheet is `/styles/Home.module.css`, which gets imported in the `index.js` file. Let's get rid of the dark-mode handler there too (you don't absolutely have to do this, but as we're learning we'll want to know how and why background colors are changing, and while it's a cool user experience to make things dark for dark-mode-preferring users, it will be too confusing to manage this while we're learning). So in `Home.module.css` delete this part:

```
@media (prefers-color-scheme: dark) {
  .card,
  .footer {
    border-color: #222;
  }
  .code {
    background: #111;
  }
  .logo img {
    filter: invert(1);
  }
}

```

### creating the `src` folder

Next up, let's create a folder for our code. This can get complicated, and it's probably worthwhile to read [a longer post on this](https://giancarlobuomprisco.com/next/a-scalable-nextjs-project-structure). 

While we put all of our pages and API routes in `/pages`, we'll be writing other code too: sometimes components that will go in our pages, sometimes utilities that will help us get data from external APIs, generate pages dynamically, etc. etc.

So in the root of the project, let's create a folder called `/src` and then, within that folder, one called `components` and at least one other another called `lib`. We'll put all of our react components in `components` and we'll put a lot of our other logic in `lib`. We could add a folder called `utils` for really little bits of code we might want to use across this app (and potentially even other apps) that are less connected to the logic of THIS app.

## creating a first component and second page

Let's now create our first react component.

In the `/src/components` folder, create a new file called `my-first-component`.