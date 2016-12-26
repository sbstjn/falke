(() => {
  'use strict';

  let nth = require('nth');
  let Tatort = require('tatort');
  let t = new Tatort('tvdirekt');

  const addMissingZero = (value) => {
    return value > 9 ? value : '0' + value;
  }

  exports = module.exports = (slots, lang) => t.after(new Date()).then(list => {
    let L = require(__dirname + '/../locales/' + lang + '.js');

    if (list.Count() > 0) {
      var item = list.First();
      var text = L.NEXT
        .replace('{day}', item.date.getUTCDate())
        .replace('{dayth}', nth.appendSuffix(item.date.getUTCDate()))
        .replace('{month}', L.MONTH[item.date.getUTCMonth()])
        .replace('{time}', [addMissingZero(item.date.getUTCHours()), addMissingZero(item.date.getUTCMinutes())].join(':'))
        .replace('{channel}', item.channel);
    } else {
      var text = L.NEXT_NONE;
    }

    return {
      text: text,
      title: L.NEXT_TITLE
    };
  })
})();
