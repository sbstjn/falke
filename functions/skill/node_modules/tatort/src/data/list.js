(() => {
  'use strict';

  const addItemsToList = (list, items) => {
    for (let i = 0, m = items.length; i < m; i++) {
      let item = items[i];

      if (item.constructor === Array) {
        list = addItemsToList(list, item);
      } else {
        list.push(item);
      }
    }

    return list;
  }

  class List {
    constructor(data) {
      if (data) {
        if (data.constructor === Array) {
          this.data = data;
        } else {
          this.data = arguments;
        }
      } else {
        this.data = [];
      }
    }

    Count() {
      return this.data.length;
    }

    Add() {
      this.data = addItemsToList(this.data, arguments);
    }

    First() {
      return this.Count() > 0 ? this.data[0] : null;
    }

    Search(func) {
      return this.data.filter(func);
    }
  }

  exports = module.exports = List
})();
