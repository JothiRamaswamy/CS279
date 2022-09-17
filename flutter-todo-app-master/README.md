# CS 279 PSET 2

## Code citation

This code was originally taken from https://github.com/itzpradip/flutter-todo-app. This repository is part of a tutorial on YouTube.
- [Flutter ToDo App Tutorial for Beginners](https://youtu.be/K4P5DZ9TRns)

## How to launch

You must have the Flutter SDK installed to launch this app. The best way to launch this todo list is to pull the current repository from github, then run `flutter run` in terminal/command line.

## How to use
When you open there is a search box on the top of the page that contains a textbox to search for todo items with a specific keyword. Below the search box is a todo list autopopulated with default todo items. At the bottom of the page is a text box and button to enter new todo items to the list. In this todo list, you can add items to the list using the text box at the bottom of the screen. You can also click each existing todo item to check/uncheck it from your list, and press a delete button on the right of each item to delete the item from the list. 

## Benefits to using Flutter

This app was primarily build using Flutter, which is one of Google's framworks for building apps for different platforms. The biggest benefits to using Flutter is that it is very easy to build cross platform apps that support not just web, but also iOS, Android, and other operating systems. Compared to our previous ToDo apps, we can now support platforms other than web, and we can do so without much extra effort. Flutter centralizes most of its business logic general to all platforms in one area such that the marginal work required to add support for another platform is very low. Rather that having to redo apps from scratch if we want to support a new platform, we can reuse a majority of the work we have already done to support this platform, so there is not much more to do. If you look at the code in this repository, most of it is central in the lib folder used by all the platforms. There is very little code specific to web or iOS or Android for example.

Note that while this app does not currently have a backend infrastructure or connect to platforms like MongoDB for example, it is very possible to still implement the same backend infrastructure that we have used in previous ToDo apps. Sinc Google owns Flutter, it is very common for people to build apps using Flutter + Firebase together.
