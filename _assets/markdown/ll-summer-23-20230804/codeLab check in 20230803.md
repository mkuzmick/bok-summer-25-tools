# codeLab check in 20230803

## what we want
* prompt for people to follow to build the personality quiz
    * high level
    * then more granular? how granular? can this be done by participants? at least some of it?
* list of learning objectives (things you need to know to get started in web projects in 23-24)
    * openai api proof of concept
    * nextjs
    * react
    * github
    * terminal basics
    * styling
    * airtable?
* coding basics
    * key terms
* knowing how to use ChatGPT well
    * how do you know you actually know?
* different tiers
    * learning js
    * getting view of airtable on web
    * personality quiz
* 

## links

- anna's working app
- repo
- nextjs documentation
-  [Code Academy Javascript free course](https://www.codecademy.com/learn/introduction-to-javascript)
 * [next.js linkedin learning course](https://www.linkedin.com/learning-login/share?account=2194065&forceAccount=false&redirect=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Flearning-next-js%3Ftrk%3Dshare_ent_url%26shareId%3DNTphnwFYRTqMcOGd7iZUNQ%253D%253D)
* [key JS terms from code academy](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet)
* [JS documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [JS objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
* [codeacademy JS glossary](https://www.codecademy.com/resources/docs/javascript)
* [vercel](https://vercel.com/)

##### Tutorials
* For creating your first app, [this one](https://nextjs.org/learn/basics/create-nextjs-app) from Next.js seems pretty good and kind of similar to what we did in orientation! 
* [This React tutorial](https://react-tutorial.app/app) is good for someone who wants to follow along and try everything out, but it does need some existing knowledge of JavaScript etc (which it also links to!)

### tunneling into objects and arrays

```import Image from 'next/image'

var myName = "Marlon"
const myInt = 7
const myFloat = 13425.13462
const myArray =["cat", ["dog", "food"], 43, 56.01, "purple"]
const myPopStar = {
  name: "Taylor",
  age: 33,
  albums: [
    {
      title: "1989",
      released: 2014
    },
    {
      title: "Red",
      released: 2012
    }
  ]
}


export default function Home() {
  return (
    <div>
      <h1>{myPopStar.name}'s app</h1>
      <p>this is a number: {myInt/myFloat}</p>
      <p>is this a number? {myInt + myName}</p>
      <p>this is an element in my array: {myArray[4]}</p>
      <h1>{myPopStar.albums[0].title}</h1>
    </div>
  )
}```

