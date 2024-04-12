const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns a copy of the todo list array', () => {
    const todosCopy = list.toArray();

    expect(todosCopy).toEqual([todo1, todo2, todo3]);
    expect(todosCopy).not.toBe(list.todos);
  });

  test('first returns the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns the first todo item', () => {
    const removedTodo = list.shift();
    expect(removedTodo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns the last todo item', () => {
    const removedTodo = list.pop();
    expect(removedTodo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true if all items are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    todo1.markDone();
    expect(list.isDone()).toBe(false);
    todo2.markDone();
    todo3.markDone();
    expect(list.isDone()).toBe(true);
  });

  test('add throws TypeError when non Todo item is added', () => {
    expect(() => list.add(new TodoList('A 2nd todo list'))).toThrow(TypeError);
    expect(() => list.add({a: 1})).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add(5)).toThrow(TypeError);
    expect(() => list.add(true)).toThrow(TypeError);
  });

  test('itemAt returns todo at given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3)).toThrow('invalid index: 3');
    expect(() => list.itemAt('hi')).toThrow('invalid index: hi');
    expect(() => list.itemAt(true)).toThrow(ReferenceError);
  });

  test('markDoneAt marks todo at given index done', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
    expect(() => list.markDoneAt('hi')).toThrow('invalid index: hi');

    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    expect(() => list.markUndoneAt('hi')).toThrow('invalid index: hi');

    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(2);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false)
  });

  test('markAllDone marks all todos done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes todo at given index', () => {
    expect(() => list.removeAt(6)).toThrow('invalid index: 6');
    expect(() => list.removeAt('hi')).toThrow(ReferenceError);

    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = "---- Today's Todos ----\n[ ] Buy milk\n" +
                 "[ ] Clean room\n[ ] Go to the gym";

    expect(list.toString()).toBe(string);
  });

  test('toString returns appropriate string for done todo', () => {
    let string = "---- Today's Todos ----\n[ ] Buy milk\n" +
                 "[X] Clean room\n[ ] Go to the gym";

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('toString returns appropriate string for all todos done', () => {
    let string = "---- Today's Todos ----\n[X] Buy milk\n" +
                 "[X] Clean room\n[X] Go to the gym";

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the elements in list', () => {
    let todos = [];
    list.forEach(todo => todos.push(todo));
    expect(todos).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    const newList = list.filter(todo => todo.isDone());
    expect(newList).toBeInstanceOf(TodoList);
    expect(newList.toArray()).toEqual([todo1]);
  });

  test('findByTitle returns todo with given title', () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
    expect(list.findByTitle('Do nothing')).toBeUndefined();
  });

  test('allDone returns a new TodoList object with all done todos', () => {
    todo2.markDone();
    todo3.markDone();

    const newList = list.allDone();
    expect(list).toBeInstanceOf(TodoList);
    expect(newList.toArray()).toEqual([todo2, todo3]);
  });

  test('markDone marks todo with given title done', () => {
    list.markDone('Go to the gym');
    list.markDone('Invalid title');
    expect(list.allDone().toArray()).toEqual([todo3]);

    list.markDone('Buy milk');
    expect(list.allDone().toArray()).toEqual([todo1, todo3]);
  });

  test('markAllUndone marks all todos undone', () => {
    list.markAllDone();
    list.markAllUndone();

    expect(list.allNotDone().toArray()).toEqual([todo1, todo2, todo3]);
  });
});