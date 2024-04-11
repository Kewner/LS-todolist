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

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}

// test todolist creation
let list = new TodoList("Today's Todos");
console.log(list);

// test todo creation
let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");

// test add method
list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
console.log(list);

// test size method
console.log(list.size());  // 4

// test first and last methods
console.log(list.first());
console.log(list.last());

let emptyList = new TodoList("Empty List");
console.log(emptyList.first());
console.log(emptyList.last());

// test indexAt
console.log(list.itemAt(1));