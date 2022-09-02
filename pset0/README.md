# CS 279 PSET 0

## Code citation

This code was originally taken from https://www.w3schools.com/howto/howto_js_todolist.asp with some modifications that I added in

## How to launch

The best way to launch this todo list is to pull the current repository from github and open the index.html file directly in your chosen browser, which will also render the CSS/JS files. For me, this means opening something like file:///Users/jothiramaswamy/Documents/cs279/pset0/index.html directly in Chrome (this will vary depending on the filepath).

## How to use
When you open there is a space at the top of the screen to add new todo list items, and then there’s the actual todo list. There are some default items on the todo list to start with, each having a close/delete button on the right side (feel free to delete the default items if you want).

Notice that the last item is checked off already just to demonstrate what it looks like. In addition to deleting items from the list, you can also just click on the items to mark/unmark them as checked. One feature that I added in that helps organize the list a bit is moving all the checked items to the bottom of the list. This is a feature that I know Apple has in their todo lists in notes that many of my friends and I make use of, so I thought I could add it in.

However, I also realized that maybe some people might not care for moving checked items to the bottom. Thus, I added in a checkbox for the user to toggle whether the checked items are moved to the bottom of the list. Once this box is checked, the checked list items are automatically moved to the bottom.

The last feature that exists is the ability to add items to the list. This you can do by typing into the textbox at the top of the screen, and then pressing the "Add" button to the right. When you press this button, whatever item you typed into the text field gets added to the bottom of the list, or right above any checked off items if the checkbox described above is toggled.