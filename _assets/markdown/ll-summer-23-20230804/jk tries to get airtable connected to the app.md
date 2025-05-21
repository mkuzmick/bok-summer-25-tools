---
tags: code
---
# jk tries to get airtable connected to the app

### in terminal...
`npm i airtable`

### in airtable...
1. create a base in the experiemental workspace that has:
* people, works, and prompts. 

I'll start with the works table and see if I can get a web based report in next from this data!

in the works table I have at minumum:
* title, worker, description, image

the image field is currently a field of .md from our show-your-images slack. I might need to change this later, but we will see how it goes!

using tokens:
1. go to https://airtable.com/developers/web/guides/personal-access-tokens and follow those directions
2. for scopes, only select `data.records:read`

...maybe put the token in your .env

### in vs code...
1. create your .env file
    `AIRTABLE_API_KEY:your token??`
    `AIRTABLE_BASE_ID: `
    
    
---
    
this might be a fun thign to try to make: https://loige.co/invite-only-microsites-with-nextjs-and-airtable/

casey's following this: https://www.section.io/engineering-education/integrate-airtable-with-nextjs/

another tutorial for building a portfolio: https://javascript.plainenglish.io/building-a-simple-portfolio-with-airtable-api-react-next-js-tailwind-css-7a24fcf3b5e6