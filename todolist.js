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
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }

    if (!this.todos.includes(todo)) this.todos.push(todo);
  }
}

let list = new TodoList("Today's Todos");
console.log(list);

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
console.log(list);