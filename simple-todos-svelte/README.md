# CS 279 TIER 1 HW4 - Svelte and Firebase

## Code citation

This code was originally built off of the tutorial from https://svelte-tutorial.meteor.com/simple-todos/.

## How to run

This code is deployed at https://jothi-svelte-tutorial.meteorapp.com/

It is using the free version of meteor so if it doesn't load immediately, give it a few minutes to load. Otherwise, follow the instructions below

1. Clone the repository from Github
2. Navigate into the repository and run `meteor run`

## Benefits of Svelte and Meteor

Svelte provides us new opportunity to write less components using regular html/css/js by creating components out of some html snippets that we use often in our webapp. However, it compares to something like React or Vue in that it compiles code to vanilla JS before running so that the app will stay fast. Compared to the previous sets of frameworks we have the ability to write HTML/CSS/JS code more efficiently with refactoring, while not compromising runtime speed.

Meteor allows us to easily connect to MongoDB without having to go online and create a MongoDB database on their site. We can handle everything with code, which is very convenient. There are also other backend features we can use, like the support for tests and mocks, which allow us to make sure that our code is working correctly. I also really appreciate Meteor's support for deployment and hosting, which I haven't seen before in any of the other frameworks we have used (other than maybe firebase).
