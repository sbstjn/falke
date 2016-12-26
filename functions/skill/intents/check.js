(() => {
  'use strict';

  let Tatort = require('tatort');
  let t = new Tatort('tvdirekt');

  exports = module.exports = (slots, lang) => {
    let L = require(__dirname + '/../locales/' + lang + '.js');

    if (['today', 'tomorrow', 'morgen', 'heute'].indexOf(slots.Date.value) === -1) {
      return Promise.resolve({
        text: L.CHECK_UNABLE,
        title: L.CHECK_TITLE
      });
    }

    let start, end;
    if (['today', 'heute'].indexOf(slots.Date.value) > -1) {
      start = new Date();
      end = new Date();
      end.setUTCHours(23);
      end.setUTCMinutes(59);
      end.setUTCSeconds(59);
    }

    if (['tomorrow', 'morgen'].indexOf(slots.Date.value) > -1) {
      start = new Date();
      start.setUTCDate(start.getUTCDate() + 1)
      start.setUTCHours(0);
      start.setUTCMinutes(0);
      start.setUTCSeconds(0);

      end = new Date();
      end.setUTCDate(end.getUTCDate() + 1)
      end.setUTCHours(23);
      end.setUTCMinutes(59);
      end.setUTCSeconds(59);
    }

    console.log('check', start, end);
    return t.between(start, end).then(
      list => {
        var text = L.CHECK_NONE.replace("{date}", slots.Date.value);

        if (list.Count() == 1) {
          text = L.CHECK_ONE.replace("{date}", slots.Date.value);
        }

        if (list.Count() > 1) {
          text = L.CHECK_MULTIPLE
            .replace("{date}", slots.Date.value)
            .replace("{count}", list.Count());
        }

        return {
          text: text,
          title: L.CHECK_TITLE
        }
      }
    );
  };
})();
