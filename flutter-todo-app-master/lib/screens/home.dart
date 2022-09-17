import 'package:flutter/material.dart';

import '../model/todo.dart';
import '../constants/colors.dart';
import '../widgets/todo_item.dart';

// creating a subclass specifically for our home page so we can adjust how
// home states are created
class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

// class specifically for the state of the home/landing page
class _HomeState extends State<Home> {
  // list of default todos generated in todoList() function
  final todosList = ToDo.todoList();
  // keep track of incoming todo items
  List<ToDo> _foundToDo = [];
  // to manage events occurring in the text box
  final _todoController = TextEditingController();

  // override init to include _foundToDo inside of each ToDo instance
  @override
  void initState() {
    _foundToDo = todosList;
    super.initState();
  }

// override the build function to adjust for the colors, constraints,
// and shapes/items inside the home state
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // general page background color, etc. 
      backgroundColor: tdBGColor,
      // load app bar with menu icon and profile pic at the top of the screen
      appBar: _buildAppBar(),
      // page body, with todo list and search bar
      // creating the body as a stack of items
      body: Stack(
        children: [
          // container and size constraints for search and existing todo list
          Container(
            padding: EdgeInsets.symmetric(
              horizontal: 20,
              vertical: 15,
            ),
            // Inside container, create the search bar and list title + items
            child: Column(
              children: [
                // create search box
                searchBox(),
                Expanded(
                  // List view for viewing list of todo items
                  child: ListView(
                    children: [
                      // container + constraints for todo list
                      Container(
                        margin: EdgeInsets.only(
                          top: 50,
                          bottom: 20,
                        ),
                        // title for todo list + adjust title style
                        child: Text(
                          'All ToDos',
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      // loop through todo list instances backwards to create a todo widget
                      // and add it to the list view, with the most recent ones on the top
                      for (ToDo todoo in _foundToDo.reversed)
                        ToDoItem(
                          todo: todoo,
                          onToDoChanged: _handleToDoChange,
                          onDeleteItem: _deleteToDoItem,
                        ),
                    ],
                  ),
                )
              ],
            ),
          ),
          // Align widget for overlaying the box to add items to list
          Align(
            alignment: Alignment.bottomCenter,
            // creating the input box and add button as a Row widget
            child: Row(children: [
              Expanded(
                // Create a container specifically for the input box
                child: Container(
                  // margin/padding constraints
                  margin: EdgeInsets.only(
                    bottom: 20,
                    right: 20,
                    left: 20,
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 5,
                  ),
                  // shape/colors and decoration for the add to list box
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: const [
                      // add a shadow around the input box for style
                      BoxShadow(
                        color: Colors.grey,
                        offset: Offset(0.0, 0.0),
                        blurRadius: 10.0,
                        spreadRadius: 0.0,
                      ),
                    ],
                    borderRadius: BorderRadius.circular(10),
                  ),
                  // creating the actual text field for adding items, and
                  // connecting to a controller to manage incoming items +
                  // style/decoration
                  child: TextField(
                    controller: _todoController,
                    decoration: InputDecoration(
                        hintText: 'Add a new todo item',
                        border: InputBorder.none),
                  ),
                ),
              ),
              // Creating a container inside the Align for the + button
              Container(
                // margin constraints
                margin: EdgeInsets.only(
                  bottom: 20,
                  right: 20,
                ),
                // creating the actual button widget and adding + as text
                child: ElevatedButton(
                  child: Text(
                    '+',
                    // adjust text size
                    style: TextStyle(
                      fontSize: 40,
                    ),
                  ),
                  // logic for adding to the list when the button is pressed
                  onPressed: () {
                    _addToDoItem(_todoController.text);
                  },
                  // add button color/size and other design
                  style: ElevatedButton.styleFrom(
                    primary: tdBlue,
                    minimumSize: Size(60, 60),
                    elevation: 10,
                  ),
                ),
              ),
            ]),
          ),
        ],
      ),
    );
  }

// when a todo item is clicked, either check if off if it is unchecked, or
// uncheck the box if it is checked, by changing the isDone variable in the
// clicked todo item
  void _handleToDoChange(ToDo todo) {
    setState(() {
      todo.isDone = !todo.isDone;
    });
  }

// if the red trash button in a todo item is clicked, remove the entire
// item from the list
  void _deleteToDoItem(String id) {
    setState(() {
      todosList.removeWhere((item) => item.id == id);
    });
  }

// when you press the + button, this creates a ToDo out of the text in the 
// associated input box and adds it to the existing list of todo items
  void _addToDoItem(String toDo) {
    setState(() {
      // creates a todo and adds it to the list
      todosList.add(ToDo(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        todoText: toDo,
      ));
    });
    // clears the text in the input field so you can add another item
    _todoController.clear();
  }

// when we try to search for something, we use the inputted keyword to search
// through the list for items containing it, or output the entire list if the
// search box is empty
  void _runFilter(String enteredKeyword) {
    List<ToDo> results = [];
    // output existing todolist if the search box is empty
    if (enteredKeyword.isEmpty) {
      results = todosList;
    } else {
      // parse the todo list for search keyword
      results = todosList
          .where((item) => item.todoText!
              .toLowerCase()
              .contains(enteredKeyword.toLowerCase()))
          .toList();
    }

// update the _foundToDo list to be the search results found above
    setState(() {
      _foundToDo = results;
    });
  }

// creating the widget for the search box
  Widget searchBox() {
    // create the container for the search box
    return Container(
      // style/location constraints
      padding: EdgeInsets.symmetric(horizontal: 15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      // creating the actual text field widget
      child: TextField(
        // when onChanged occurs, run _runFilter with the keyword in search
        onChanged: (value) => _runFilter(value),
        // specific text field padding and other style characteristics
        decoration: InputDecoration(
          contentPadding: EdgeInsets.all(0),
          // add search icon to the beginning of the search box
          prefixIcon: Icon(
            Icons.search,
            color: tdBlack,
            size: 20,
          ),
          // constraints for the specific search icon
          prefixIconConstraints: BoxConstraints(
            maxHeight: 20,
            minWidth: 25,
          ),
          // general search box characteristics and style
          border: InputBorder.none,
          hintText: 'Search',
          hintStyle: TextStyle(color: tdGrey),
        ),
      ),
    );
  }

// create the app bar widget with the menu icon and profile pic
// not necessary for the todo list but looks pretty cool to include
// and was there in the tutorial followed for this
  AppBar _buildAppBar() {
    // create the app bar widget
    return AppBar(
      // style elements
      backgroundColor: tdBGColor,
      elevation: 0,
      // create the row element containing the menu and profile icons
      title: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        // menu icon
        Icon(
          Icons.menu,
          color: tdBlack,
          size: 30,
        ),
        // container for the profile pic
        Container(
          height: 40,
          width: 40,
          // loading the actual picture + size/shape constraints
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Image.asset('assets/images/avatar.jpeg'),
          ),
        ),
      ]),
    );
  }
}
