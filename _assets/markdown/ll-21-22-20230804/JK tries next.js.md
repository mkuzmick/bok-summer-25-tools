# JK tries next.js

[next.js]() has emerged as something to check out. So, I'm going to try out their [Learn next.js](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website) tutorial and see how it goes. Follow my journey here!


## Notes

My first detour led me to read about [the pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/) which is an interesting learning design approach actually! It basically says that the goal is to guide developers into a successful experience. That learning and developing shouldn't be as diffucult as climbing a mountain and falling into traps, but should be an inevitable fall into success.


I finished the first lesson super fast--it was probably the best intro to coding tutorial I've done--way better than the react one so far!

> Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).

### Keyterms
* **code splitting** so only what you need for the page you are on is loaded, so if your site has a hundred resource pages, or 75 poeple pages, it won;t try to load all of them at once and take forever!!

* **prefetching (in production)** basically, if a page you are on has a next/link component, it will load that linked page in the background so when you click to go to it, it loads instantaneously! awesome!

* **client-side navigation** pages switching happens with java script on the client side of things, instead of the browser refreshing entirely each time you switch pages...so if you have css, it won't disappear and reappear each time, which is cool--it's also loading faster which is great as well.