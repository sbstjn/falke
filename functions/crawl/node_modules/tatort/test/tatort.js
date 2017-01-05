(() => {
  'use strict';

  let moment = require('moment-timezone');
  let assert = require('assert')
  let fs = require('fs');

  describe('Tatort', () => {
    let Tatort = require(__dirname + '/../');
    let t = new Tatort('tvdirekt', fs.readFileSync(__dirname + '/fixtures/example.html'));

    describe('list()', () => {
      it('should return a list of upcoming Tatort shows',
        () => t.list().then(
          (list) => {
            assert.equal(list.Count(), 10)

            var cur = list.Next();
            assert.equal(cur.name, 'Preis des Lebens')

            list.Next();
            cur = list.Next();
            assert.equal(cur.name, 'Spiel auf Zeit')
          }
        )
      );

      it('should return a GMT+1 timestamp',
        () => t.list().then(
          (list) => {
            assert.ok((list.First().date + "").indexOf('GMT+0100'))
          }
        )
      );
    });

    describe('after()', () => {
      it('should return shows after specified date #1',
        () => t.after(
          moment.tz(new Date(2016, 11, 1, 0, 0, 0), 'Europe/Berlin')
        ).then(
          list => {
            assert(list.First().name, 'Im Namen des Vaters');
          }
        )
      );

      it('should return shows after specified date #2',
        () => t.after(
          moment.tz(new Date(2016, 11, 26, 0, 0, 0), 'Europe/Berlin')
        ).then(
          list => {
            assert(list.First().name, 'Klingelingeling');
          }
        )
      );

      it('should return shows after specified date #3',
        () => t.after(
          moment.tz(new Date(2016, 11, 28, 20, 59, 59), 'Europe/Berlin')
        ).then(
          list => {
            assert(list.First().name, 'Der Hammer');
          }
        )
      );

      it('should return shows after specified date #4',
        () => t.after(
          moment.tz(new Date(2016, 11, 28, 21, 0, 1), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.First().name, 'Preis des Lebens');
          }
        )
      );

      it('should return shows after specified date #5',
        () => t.after(
          moment.tz(new Date(2017, 0, 7, 23, 15, 1), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.First(), null);
          }
        )
      );
    });

    /*
    describe('between', () => {
      it('should filter shows #1',
        () => t.between(
          moment.tz(new Date(2017, 0, 6, 22, 0, 0), 'Europe/Berlin'),
          moment.tz(new Date(2017, 0, 6, 23, 50,0), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.Count(), 2);
          }
        )
      );

      it('should filter shows #2',
        () => t.between(
          moment.tz(new Date(2017, 0, 4, 22, 0, 0), 'Europe/Berlin'),
          moment.tz(new Date(2017, 0, 4, 22, 5, 0), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.Count(), 2);
          }
        )
      );
    }); */
  });
})();
