---
tags: code
---

# jk tries authentication with next.js apps

jk tries authentication with next.js apps

some links to go through:
* https://nextjs.org/docs/pages/building-your-application/routing/authenticating
    * next site suggests [NextAuth.js](https://github.com/nextauthjs/next-auth-example) if we want a system with google.

* https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/
    * this uses authO
* https://github.com/gladly-team/next-firebase-auth
    *    this is firebase



## some notes




### gpt tries to help:
Certainly! Here's a more detailed explanation on how to use Google accounts for authentication in your Next.js app:

1. Set Up a Google Developer Account:
   - Go to the [Google Developers Console](https://console.developers.google.com/) and create a new project.
   - Enable the "Google Sign-In" API for your project. This will allow your app to authenticate users using their Google accounts.

2. Obtain Google API Credentials:
   - In the Google Developers Console, navigate to the "Credentials" section of your project.
   - Create credentials for your app by clicking on "Create Credentials" and selecting "OAuth client ID."
   - Configure the OAuth consent screen, providing the necessary information about your app.
   - Select "Web application" as the application type.
   - Add the appropriate authorized JavaScript origins and redirect URIs for your Next.js app. For local development, the origin might be "http://localhost:3000" and the redirect URI could be "http://localhost:3000/api/auth/callback/google" (adjust as needed).
   - Once the credentials are created, note down the client ID and client secret. You'll need these values in the next steps.

3. Implement Authentication in Your Next.js App:
   - Install the required dependencies. Open your terminal and navigate to your Next.js project directory, then run the following command:
     ```
     npm install next-auth
     ```

   - Create an API route for handling the Google authentication callback. In your Next.js project, create a file named `pages/api/auth/callback/google.js` with the following content:
     ```javascript
     import NextAuth from 'next-auth'
     import Providers from 'next-auth/providers'

     const options = {
       providers: [
         Providers.Google({
           clientId: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         }),
       ],
     }

     export default NextAuth(options)
     ```

   - Replace `process.env.GOOGLE_CLIENT_ID` and `process.env.GOOGLE_CLIENT_SECRET` with the corresponding values from the credentials you obtained in step 2.

   - Configure NextAuth by creating a file named `pages/api/auth/[...nextauth].js` with the following content:
     ```javascript
     import NextAuth from 'next-auth'
     import Providers from 'next-auth/providers'

     const options = {
       providers: [
         Providers.Google({
           clientId: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         }),
       ],
       // Customize other options as needed
     }

     export default NextAuth(options)
     ```

   - Update your Next.js configuration to include the environment variables. Open the `.env.local` file in your project root directory and add the following lines:
     ```
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

   - Now you can use the `useSession` hook provided by NextAuth to access the authenticated user's session in your components. For example:
     ```javascript
     import { useSession } from 'next-auth/client'

     function MyComponent() {
       const [session, loading] = useSession()

       if (loading) {
         return <div>Loading...</div>
       }

       if (session) {
         return <div>Logged in as {session.user.email}</div>
       }

       return <div>Not logged in</div>
     }

     export default MyComponent
     ```

That's it! With these steps, you should be able to enable Google account authentication in your Next.js app. Remember to replace `your_google_client_id` and `your_google_client_secret` with your actual credentials from the Google Developers Console.

To limit access to your Next.js app based on specific Google emails stored in Airtable, you can follow these steps:

1. Fetch Email List from Airtable:
   - Install the `airtable` package by running the following command in your Next.js project directory:
     ```
     npm install airtable
     ```

   - In your API route file (`pages/api/auth/callback/google.js`), import the `airtable` package and add the code to fetch the email list from Airtable. Here's an example:

     ```javascript
     import Airtable from 'airtable'
     import NextAuth from 'next-auth'
     import Providers from 'next-auth/providers'

     const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
       'your_airtable_base_id'
     )

     const options = {
       providers: [
         Providers.Google({
           clientId: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         }),
       ],
       callbacks: {
         async signIn(user, account, profile) {
           const { email } = user
           const records = await base('Emails').select({ fields: ['Email'] }).all()
           const allowedEmails = records.map((record) => record.get('Email'))

           if (allowedEmails.includes(email)) {
             return true // Allow sign-in
           } else {
             throw new Error('Unauthorized email') // Block sign-in
           }
         },
       },
     }

     export default NextAuth(options)
     ```

   - Replace `'your_airtable_base_id'` with the actual base ID of your Airtable base.
   - Update the Airtable credentials by adding the following line to your `.env.local` file:
     ```
     AIRTABLE_API_KEY=your_airtable_api_key
     ```

2. Configure Airtable:
   - In your Airtable base, create a table named "Emails" with a single field named "Email".
   - Add the specific email addresses you want to allow access to as records in the "Emails" table.

3. Test the Authentication:
   - Start your Next.js app and attempt to sign in using a Google account.
   - If the email address matches one stored in Airtable, the sign-in will be allowed.
   - If the email address is not found in Airtable, a "Unauthorized email" error will be thrown.

By implementing this logic, you can limit access to your Next.js app based on the specific Google email addresses stored in your Airtable database.



---

### things that would be cool to make:

a scheduler powered by airtable and next
* confirm the recurring shift assigned
* has a sign up block for each studio assistance, etc. offered (ex. 4 slots, you can see who else has signed up)
* sign up block for office hours, with specific sign ups for tools needed (connects to lluf license tags and filters what is still needed?)
* special invites to live event support

a shift launch app (maybe this should be a slack modal though)
* llufs log in when they arrive (we can log their start time if we want to)
* they complete a few basic questions (caleb wants us to call this app "vibe check")
* they submit and then they get a menu of things to work on based on their vibe
    * ex. if they are wanting to zone in on something at a computer for a while, they can do footage tagging task (caleb is testing this out now) or m2s, or documentation station type of work
    * the tasks should include some attributes like:
        * length of task (5 min -- infinite)
        * pre-reqs/skill reqs/badge license (maybe this can be handled earlier and filtered out of the menu if the lluf hasn't completed that licensing)
        * if the task can be done by multiple llufs or a specific number
        * if the task is repeatable
* they select the task they want to work on
    * if the task is limited to a single lluf, it gets filtered out of the future menus maybe


