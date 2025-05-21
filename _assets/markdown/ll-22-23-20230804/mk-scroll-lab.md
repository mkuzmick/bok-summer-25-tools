---
tags: mk
---

# mk-scroll-lab

- scroll
        - this is basically front-end lab.
        - mdf report elements
        - [mk-css-notes](/k0t8cMcXR2uWAyB5VBpK7g)
        - plan for dLab at end of month or in november (Carly and Andreja)
        - [mk-scroll-lab-notes-20221014](/EFt-XU23SVG7bfPKywYyNA)
        - [mk-microproject-document-google-sheets-as-backend](/RHsCJJpOS2W9Kxhpfy9EWA)
        - [animations in figma](https://spin.atomicobject.com/2022/07/20/scroll-effect-figma/)


### tutorial sequence

- [mk-scroll-lab-tutorial-0-setup](/MUW6VjHRQAaO_fEV8mLqnQ)
- [mk-scroll-lab-tutorial-1-react-basics](/p4_MkX7jRzWxLecygcrugw)
- [mk-scroll-lab-tutorial-2-styling-basics](/pLF16pvMSjyk2zaeKf-2IA)
- [mk-scroll-lab-tutorial-3-scrollama-basics](/pGtK27VJRIi8tLdgM6-kXw)
- [mk-scroll-lab-tutorial-4-js-and-api-basics](/QjG6ZNeyTk-XjNN52TYNFA)
- 

### notes on intersection observer

- https://dev.to/producthackers/intersection-observer-using-react-49ko




## remaking Anna's hello

### todo

- use animation (instead of transitions) for the span that gets highlighted on scroll up


## mk initial anna-hello build


mainly porting over Anna's styles and structure.

<iframe src="https://mk-scroll-lab.vercel.app/people/anna/hello-all-the-poems" width="100%" height="800px" frameborder="0"></iframe>


## tests

testing width

<div style="background-color: red; opacity:.1; height: 10px; width: 540px"></div>
<div style="background-color: red; opacity:.2; height: 10px; width: 560px"></div>
<div style="background-color: red; opacity:.3; height: 10px; width: 580px"></div>
<div style="background-color: red; opacity:.4; height: 10px; width: 600px"></div>
<div style="background-color: red; opacity:.5; height: 10px; width: 620px"></div>
<div style="background-color: red; opacity:.6; height: 10px; width: 640px"></div>
<div style="background-color: red; opacity:.7; height: 10px; width: 660px"></div>
<div style="background-color: red; opacity:.8; height: 10px; width: 680px"></div>
<div style="background-color: red; opacity:.9; height: 10px; width: 700px"></div>
<div style="background-color: red; opacity:1; height: 10px; width: 720px"></div>

## reference

#### some notes on the string replacement issues

packages:
- https://github.com/iansinnott/react-string-replace
- https://www.npmjs.com/package/react-process-string
- https://www.npmjs.com/package/regexify-string





### scroll
- first, in the scroll-lab zone. Let's pick a couple of targets.
    - player card scrolling (and scrolling within a card)
    - something pulling from airtable involve blog-posts
    - simple story ideas
        - shot by shot analysis
        - mdf updates
        - 
- [mk-studies-scroll-effects-with-video](/rgcZtPo4Q3m06O6N1GxoDA)
- scroll-lab must-nows
    1. ~~work through the 3 steps of the top hit for [framer and next page transitions](https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs)~~
    2. ~~then through [this alternative](https://wallis.dev/blog/nextjs-page-transitions-with-framer-motion)~~
    3. ~~handle error~~
        ```
        Error: Hydration failed because the initial UI does not match what was rendered on the server.
        ```
        - see [this fix](https://nextjs.org/docs/messages/react-hydration-error). essentially we need to 
    4. animate youtube player on 
        - onReady
        - onPlay
        - 
    5. use instance methods on player with ref 
    6. draw graph, accept input
    7. work through [framer docs](https://www.framer.com/docs/examples/) 
    8. try a css-only option like this [animate css tutorial](https://www.youtube.com/watch?v=8aCVQHxdHLA)
    9. try some scroll triggered stuff
    10. something with gsap
    11. airtable db config and utilities
    12. [react-player](https://www.npmjs.com/package/react-player)
    13. synthesize for students
    14. connect to [mongo](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/)
    15. do at least one [prisma + next tutorial](https://vercel.com/guides/nextjs-prisma-postgres)
    16. explore [react-player](https://www.npmjs.com/package/react-player) in great detail
    17. 
- scroll-lab maybe-laters
    - work on tutorial building blocks
        - just constructing some box elements in react
        - css for styling those
        - then just getting some really basic steps in with react-scrollama
        - but try react-scroll
    tutorials and docs
    - react-scroll scroll to top (in small unobjectionable top corner thing)
    - [page animations with next and framer](https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs)
    - alternative [next and framer](https://wallis.dev/blog/nextjs-page-transitions-with-framer-motion)
    - https://dev.to/ivandotv/full-page-transitions-with-next-js-1co5
    - https://seb-graf.com/blog/nextjs-page-transition
    - [morphing svg paths](https://css-tricks.com/morphing-svg-with-react-spring/)
    - long [page transitions tutorial](https://www.youtube.com/watch?v=vF28aL7RLaU) with react-transition-group
    - [morphing svg with react-spring](https://css-tricks.com/morphing-svg-with-react-spring/)
    - the gatsby [anilink code](https://github.com/TylerBarnes/gatsby-plugin-transition-link/tree/master/src/AniLink) is a usefulu reference for rebuilding things like the wipe and paint-drip effects
    - [tween pages](https://github.com/johnpolacek/TweenPages) for next
        - https://tweenpages.vercel.app/docs
    - [getting started with gsap and react](https://greensock.com/react)
    - [gsap advanced](https://greensock.com/react-advanced)
    - [slide presentation in react with spectacle](https://formidable.com/open-source/spectacle/docs/)
    - 
## next

- articulate how all of this is connected to animation lab
- the table as scrollytelling capture zone
- from react to video?!
- the phone and the restricted field of view
    - peripheral vision, context, head-turning
    - horizontal comparisons
    - imprisoned in a column
    - `const alert = "this site cannot be viewed on phones"`
- how do we populate a site on the fly with images from the studio?
    - host on s3? firestore and firebase? locally?
    - but at a simpler level, how does the app know the urls?
    - let's say
        - student writes on cards
        - student video captured
        - transcript captured
        - stills captured
        - audio captured
        - pre-existing course materials
    - what then?
        - all saved to synology
        - available there for local host
        - programmatically change files for running in dev mode
        - dynamically generate routes based on file system
        - notify us of those routes in slack
        - things recognized on camera trigger some of this?
            - in lens studio?
            - cv python stuff?
        - lots of image recognition
        - poem highlighting
        - 



### more next links

- https://nextjs.org/blog/markdown
- https://github.com/vercel/next.js/tree/canary/examples/with-mdx
- https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote
- https://blog.openreplay.com/creating-a-markdown-blog-powered-by-next-js-in-under-an-hour
- https://nextjs.org/docs/advanced-features/using-mdx
- https://www.primefaces.org/primereact/setup/
- https://mantine.dev/pages/basics/
