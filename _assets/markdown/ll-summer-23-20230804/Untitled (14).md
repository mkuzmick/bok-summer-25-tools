
## the steps
* when setting up the app
    * remember to say NO to App Router!
    * npm install airtable
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05J5B8DRRT/screen_shot_2023-07-21_at_3.39.18_pm.png?pub_secret=508ebf3437)
* set up coding environment and get connected to local server
* make initial React component / set up quiz homepage
* learn about and import useState
    * get the buttons set up so that the options selected are stored by the app
    * in image below, I am NOT calling from airtable yet, just manually entering answerOptions
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05JASXMQG4/screen_shot_2023-07-21_at_4.12.48_pm.png?pub_secret=e413d89671)
* I'm very stuck on getting the questions to pass in from airtable!
    * chatGPT isn't really helping me because I'm not able to see when it's giving me code that's overly complex (which I think it is - I think it has a specific image in mind of what a 'quiz' is and it's confused by the format I want for the quiz lol)
    * need to remember how to use react components!
        * think about the file structure
        * utils versus components? is there a meaningful difference?
        * module.css > js relationship
    * [styling doc next.js](https://nextjs.org/docs/pages/building-your-application/styling/css-modules)
    * useState
    * fetch instead of axios (chatGPT always wants to import axios)
* github
```
git add .
git commit -m "whatever you want the message to be"
git push origin main
```



## things I want to add
* a loop
* images to the buttons
* way to calculate overall responses

## images
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05K4QHAXGS/screen_shot_2023-07-27_at_3.48.35_pm.png?pub_secret=025f390064)
got the array

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05JULVCGGP/screen_shot_2023-07-28_at_10.16.55_am.png?pub_secret=c34e1b1f0e)
deleted the json line to hide the array
and made buttons