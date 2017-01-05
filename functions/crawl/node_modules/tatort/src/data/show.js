(() => {
  'use strict';

  class Tatort {
    constructor(name, date, channel) {
      this.name = name;
      this.date = date;
      this.channel = channel;
    }

    Name() {
      return this.name;
    }
  }

  exports = module.exports = Tatort
})();
