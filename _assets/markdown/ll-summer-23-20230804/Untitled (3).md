App in progress [here](https://ll-quiz-test.vercel.app/)
Three main parts:
- Airtable
- JS
- OpenAI API

### Steps in coding:
- Maybe [this tutorial by Marlon](https://hackmd.io/@ll-22-23/B1ZtH9-ms) can be the step-by step for the initial setup? 

#### Basic app structure
- We want to have a main quiz page, on which users click a series of options in a "this or that" format (so 2 options for each one). Those options should come from an Airtable! So in the airtable, we will have a series of options, like 'Dunkin or Starbucks' stored in each row. We want the buttons to be made up of those options. After a user clicks an option for each question, we want to return a list of characters that matches the user's personality. How do we do this? We send a string to the OpenAI API saying something like "If a person is more Dunkin' than Starbucks, more ___ than ___, more ___ than ___,...etc, which 10 fictional characters are they most similar to?*" We then will return that to the user!

* *We can also think about how to phrase this to get optimal answers. :)

#### Making the page 
- We have a lot of flexibility about this! All we *really* need is a series of question buttons with two buttons per question, a button to submit the selections, and a space for the answers to be returned. From there, we can add whatever we want to spruce up the page! 
- For now, we can make buttons that have stand-in text, and then we'll add the text from the Airtable as a separate step. 

#### Clickable buttons
- We need the buttons to be clickable and store a string of all of the answers that the user clicked as well as all of the ones they didn't! 
- We should initialize some things to begin with. First, we need an object to store the options that have been clicked and one for those which we did not click which we can update as we go.
- To add to this, we will call a function to update the objects and add to the array that has both the selected and unselected options.




#### Pulling in from the airtable to make the quiz dynamic
 - Connecting to the Airtable API:
     - We want to [create a personal access token](https://airtable.com/create/tokens/new) for the base
     - For scope, all we need at this point is data.records:read, schema.bases:read
     - For access, choose whichever base you're using (right now, I'm using personality-quiz)
     - We also will need 
 - Adding the Airtable data to our questions: 
     - We'll do this with the useEffect hook:
    
#### Sending the user input to the OpenAI API
- Connecting to the OpenAI API:

- Like with handleSelect, the function called for each selected option, we can make a function called handleSubmit, which will be called when a user clicks the submit button.


#### Final steps
    