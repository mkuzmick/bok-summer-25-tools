# tool-challenge-react-card-component

We frequently need to create web content that involves lists or galleries or playlists or other groups of "objects" (like people, software tools, student projects, videos, etc).

In web development, one strategy for doing this is to create a "card" component, then to shove all the data from your data base into these card templates (with the properties of each record populating the cards various empty fields).

To see some examples of this, check out [this pinterest](https://www.pinterest.com/learninglabpins/projectcardcomponent/) (or, even better, add to it).

![](https://i.pinimg.com/564x/ef/b3/f9/efb3f960e764e85329a2b3dc8557fadd.jpg)

![](https://i.pinimg.com/564x/37/4b/90/374b905ddea648bfa8d36254a0547241.jpg)

![](https://149842033.v2.pressablecdn.com/wp-content/uploads/2019/02/CSS-Cards-E-Commerce-Shop-Card.jpg)



You can also check out actual printed cards (baseball cards, pokemon cards, etc) for inspiration. We have a [pinterest](https://www.pinterest.com/learninglabpins/project-ll-cards/) for that too.

![rapidash card](https://i.pinimg.com/564x/b2/fe/5b/b2fe5b3a2cd5aa75e6acc960226970d9.jpg)

### the challenge

create a React component (using css modules for styling) that would work well for one of the following LL needs:

- student project card (with room for a video or still embed, the student's name, the first paragraph of an artist's statement)
- a LLUF bio card (with name, tools, projects, other info Madeleine and Jordan would like to see)
- a tool card (with logo for the app, then details on it and links to projects)
- an LL task card (with the title of the task, link to the resource or hackmd doc, etc.)


## resources

if you have never made a react component, you may want to follow these steps

- create a nextjs app with `npx create-next-app my-app-name`
- start it up with `cd my-app-name` then `npm run dev`
- create a new page (or delete everything on the home page) 
- create a `/components` folder and add `MyCard.js` and `MyCard.module.css` to it
- import your card on the home page (or other page)
- get coding!

### more elaborate steps

