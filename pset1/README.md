# CS 279 PSET 1

## Code citation

This code was originally taken from https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583

## How to launch

The best way to launch this todo list is to pull the current repository from github, then set up npm in the repository and run `npm start`. One thing to note is that I did not push my .env file to the repository since it has private information. The .env file should contain the connection string to the mongodb cluster you want to use.

## How to use
When you open there is a box on the page that contains a textbox to add new todo list items, and then there’s the actual todo list. In this todo list, you can add items to the list and delete existing items from the list. You can also expand upon these basic features by editing existing todo list items as well.

You can add items by simply typing whatever you want into the text field shown, and pressing the green plus button to the right of the textfield to add the item. Once items are added to the list, each item will display the associated text for the todo item, along with two buttons. The rightmost button is the delete button, which deletes the item from the list. The leftmost button is the edit button that allows you to change the text of the todo item without changing anything else on the list.

## How this app was built

This app uses Node.js and MongoDB as well as HTML/CSS/JS. Node allows us to set up a backend infrastructure for processing API calls through express and storing our todo list items using MongoDB. Whenever we change anything in our todo list, whether than is adding, editing, or deleting items, we make calls to MongoDB to reflect the same changes in our database of todo list items. When we reload the app, we make a call to MongoDB to search for all the existing todo list items and populate our todo list with these items. 

Node and MongoDB are useful as they provide some backend infrastructure to the app, which allows us to easily expand the functionality of the todo list. For example, a simple todo list with just HTML/CSS/JS can have add and delete operations but Node and MongoDB allow us to expand upon this with edit operations, which would be much harder to implement otherwise. Another benefit to Node and MongoDB is that the data we can collect is more permanent. If we load our todo list and add some items in, but then reload the todo list after a few days, the initial todo list items we added will still be there. On the other hand, todo lists using HTML/CSS/JS don't have this capability of storing data this easily and only store temporary information that gets lost when you reload the app.

There are still benefits to using just HTML/CSS/JS. One of the biggest benefits is that the app works fully offline, so you aren't reliant on a fully functioning Internet in order to use it. In situations where you just need to quickly use a todo list for a short period of time (going to a grocery store and getting items, for example) and don't plan to do anything more than add and check off items, MongoDB/Node is not necessary and it could be beneficial to use an offline app with HTML/CSS/JS only.