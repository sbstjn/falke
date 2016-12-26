(() => {
  'use strict';

  let List = require('./data/list.js');
  let TVDirekt = require('./source/tvdirekt.js');

  class Tatort {
    constructor(source, fixture) {
      let Source = require('./source/' + source + '.js')
      this.source = new Source(fixture);
    }

    between(start, end) {
      return this.list().then(list => new List(list.Search(item => item.date >= start && item.date <= end)))
    }

    after(date) {
      return this.list().then(list => new List(list.Search(item => item.date >= date)))
    }

    list() {
      return this.source.list();
    }
  }

  exports = module.exports = Tatort;
})();
