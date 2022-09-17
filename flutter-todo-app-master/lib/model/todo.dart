// Define a class for ToDo list items, which contain an
// id, text of the item to complete, and whether the item
// has been completed
class ToDo {
  String? id;
  String? todoText;
  bool isDone;

// constructor for creating a ToDo instance - requiring id
// and the text, but not whether its completed or not (default
// to false)
  ToDo({
    required this.id,
    required this.todoText,
    this.isDone = false,
  });

// method to get a default todolist, which creates a fixed set of
// instances of todo items and returns it (to be used to populate
// default items when the todo list is first loaded)
  static List<ToDo> todoList() {
    return [
      ToDo(id: '01', todoText: 'Morning Excercise', isDone: true ),
      ToDo(id: '02', todoText: 'Buy Groceries', isDone: true ),
      ToDo(id: '03', todoText: 'Check Emails', ),
      ToDo(id: '04', todoText: 'Team Meeting', ),
      ToDo(id: '05', todoText: 'Work on mobile apps for 2 hour', ),
      ToDo(id: '06', todoText: 'Dinner with Jenny', ),
    ];
  }
}