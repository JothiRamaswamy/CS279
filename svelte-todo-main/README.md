# CS 279 TIER 1 HW4 - Svelte and Firebase

## Code citation

This code was originally built off of https://github.com/refact0r/svelte-todo and https://github.com/fireship-io/182-svelte-firebase.

## How to run

1. Clone the repository from Github
2. Navigate into the repository and run `npm i`
3. Once you run the above command, start the webapp using `npm run dev`
4. Once the web app opens, click log in, sign in with your google account, and then a todo list should appear that you can edit and add to.

**you may need to run `firebase login` if these steps don't work.


## Benefits of Svelte and Firebase

Svelte provides us new opportunity to write less components using regular html/css/js by creating components out of some html snippets that we use often in our webapp. However, it compares to something like React or Vue in that it compiles code to vanilla JS before running so that the app will stay fast. Compared to the previous sets of frameworks we have the ability to write HTML/CSS/JS code more efficiently with refactoring, while not compromising runtime speed.

Firebase provides new opportunities compared to the previous sets of frameworks because we now have the abiity to connect users to not just an online database, but also to google accounts which already stores user information we can leverage to our advantage. In this case, we are able to leverage user information to allow multiple users to create their own todo apps and save it to their own accounts, rather than only having one todo list for the entire webapp that doesn't separate based on users.
