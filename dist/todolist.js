"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Todo = require('./todo');
var TodoList = /*#__PURE__*/function () {
  function TodoList(title) {
    _classCallCheck(this, TodoList);
    this.title = title;
    this.todos = [];
  }
  return _createClass(TodoList, [{
    key: "add",
    value: function add(todo) {
      if (!(todo instanceof Todo)) {
        throw new TypeError('can only add Todo objects');
      }
      this.todos.push(todo);
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.size() - 1];
    }
  }, {
    key: "itemAt",
    value: function itemAt(index) {
      this._validateIndex(index);
      return this.todos[index];
    }
  }, {
    key: "markDoneAt",
    value: function markDoneAt(index) {
      this.itemAt(index).markDone();
    }
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(index) {
      this.itemAt(index).markUndone();
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      this._validateIndex(index);
      return this.todos.splice(index, 1);
    }
  }, {
    key: "toString",
    value: function toString() {
      var title = "---- ".concat(this.title, " ----");
      var list = this.todos.map(function (todo) {
        return todo.toString();
      }).join('\n');
      return "".concat(title, "\n").concat(list);
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      this.todos.forEach(callback);
    }
  }, {
    key: "filter",
    value: function filter(callback) {
      var newList = new TodoList(this.title);
      this.forEach(function (todo) {
        if (callback(todo)) {
          newList.add(todo);
        }
      });
      return newList;
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.getTitle() === title;
      }).first();
    }
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.isDone();
      });
    }
  }, {
    key: "markDone",
    value: function markDone(title) {
      var _this$findByTitle;
      // optional chaining instead of if statement
      (_this$findByTitle = this.findByTitle(title)) === null || _this$findByTitle === void 0 || _this$findByTitle.markDone();
    }
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      this.forEach(function (todo) {
        return todo.markDone();
      });
    }
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      this.forEach(function (todo) {
        return todo.markUndone();
      });
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return _toConsumableArray(this.todos);
    }

    // _ in name indicated 'private' method
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      if (!(index in this.todos)) {
        throw new ReferenceError("invalid index: ".concat(index));
      }
    }
  }]);
}();
module.exports = TodoList;