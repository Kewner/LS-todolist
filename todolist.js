// Class TodoList represents a collection of Todo objects.
// We can perform typical collection-oriented actions on a
// TodoList object, including iteration and selection.

const Todo = require('./todo');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {

  }
}

let list = new TodoList("Today's Todos");
console.log(list);