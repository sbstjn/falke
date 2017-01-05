(() => {
  'use strict';

  let List = require(__dirname + '/../');

  let chai = require('chai');
  let assert = chai.assert;


  describe('List', () => {
    describe('constructor()', () => {
      it('can create a empty list', () => {
        let l = new List();

        assert.equal(l.Count(), 0)
      });

      it('can prefil a list with an array', () => {
        let l = new List([1, 2, 3]);

        assert.equal(l.Count(), 3)
      })

      it('can prefil a list with multiple items', () => {
        let l = new List(1, 2, 3);

        assert.equal(l.Count(), 3)
      })
    });

    describe('add()', () => {
      it('handles single items', () => {
        let l = new List([1, 2, 3])

        assert.equal(l.Count(), 3);

        l.Add(4);
        l.Add(5);

        assert.equal(l.Count(), 5);
      });

      it('handles multiple items', () => {
        let l = new List([1, 2, 3])

        assert.equal(l.Count(), 3);

        l.Add(4, 5);

        assert.equal(l.Count(), 5);
      });

      it('handles array of items', () => {
        let l = new List([1, 2, 3])

        assert.equal(l.Count(), 3);

        l.Add([4, 5]);

        assert.equal(l.Count(), 5);
      });
    })
  });

})();
