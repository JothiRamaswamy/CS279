import 'package:flutter/material.dart';

import '../model/todo.dart';
import '../constants/colors.dart';

// designing the actual todo widget subclass
// inputs include todo object with all the todo info, and methods to follow
// if certain events occur with the todo list
class ToDoItem extends StatelessWidget {
  final ToDo todo;
  final onToDoChanged;
  final onDeleteItem;

// constructor for ToDoItem including a key and requiring the above fields
  const ToDoItem({
    Key? key,
    required this.todo,
    required this.onToDoChanged,
    required this.onDeleteItem,
  }) : super(key: key);

// override the build function to be specific for the todo item logic
  @override
  Widget build(BuildContext context) {
    // container for todo item widgets
    return Container(
      // adjust margin
      margin: EdgeInsets.only(bottom: 20),
      // create the tile in which the todo text and buttons live
      child: ListTile(
        // when you click the tile, change the isDone status
        onTap: () {
          onToDoChanged(todo);
        },
        // adjust shape, padding, and other style characteristics of tile
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
        tileColor: Colors.white,
        // create the check box icon for whether the item is done
        leading: Icon(
          todo.isDone ? Icons.check_box : Icons.check_box_outline_blank,
          color: tdBlue,
        ),
        // create the text label containing the actual task to do
        title: Text(
          todo.todoText!,
          // style for text (crossing off when the item is done too)
          style: TextStyle(
            fontSize: 16,
            color: tdBlack,
            decoration: todo.isDone ? TextDecoration.lineThrough : null,
          ),
        ),
        // creating a sub container for the delete button
        trailing: Container(
          // size/location constraints
          padding: EdgeInsets.all(0),
          margin: EdgeInsets.symmetric(vertical: 12),
          height: 35,
          width: 35,
          // color and radius of the delete button
          decoration: BoxDecoration(
            color: tdRed,
            borderRadius: BorderRadius.circular(5),
          ),
          // the actual icon for the delete button
          child: IconButton(
            color: Colors.white,
            iconSize: 18,
            icon: Icon(Icons.delete),
            // when the delete button is pressed, delete the associated item
            onPressed: () {
              onDeleteItem(todo.id);
            },
          ),
        ),
      ),
    );
  }
}
