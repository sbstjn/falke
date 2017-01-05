(() => {
  'use strict'

  let fetch = require('node-fetch');
  let moment = require('moment-timezone');
  let cheerio = require('cheerio')

  let Tatort = require(__dirname + '/../data/show.js');
  let List = require('liste');

  let fromParent = function(parent) {
    let now = new Date();

    let date = parent.find('.date').text().substr(0, 5).split('.');
    let time = parent.find('.time .time').text().split(':');
    let dateText = [2017, date[1], date[0]].join('-') + " " + [time[0], time[1], '00'].join(':');

    if (parseInt(date[1], 10) > 5) {
      return null;
    }

    return new Tatort(
      parent.find('h3 a').text().replace('Tatort: ', ''),
      moment.tz(dateText, 'Europe/Berlin'),
      parent.find('.station a').attr('title')
    )
  }

  class Source {
    constructor(fake) {
      this.fake = fake;
    }

    data() {
      if (this.fake) {
        return Promise.resolve(this.fake);
      }

      return fetch(
        "http://www.tvdirekt.de/tatort-heute-abend.html"
      ).then(
        (res) => {
          if (res.status === 200) {
            return res.text();
          }

          throw new Error("Failed to fetch data; Status: " + res.status)
        }
      )
    }

    list() {
      return this.data().then(
        (data) => {
          let doc = cheerio.load(data);
          let list = doc('h3 a[href*="/tv-programm/sendungsdetails/"]')

          if (list.length == 0) {
            throw new Error("Unable to parse HTML structure");
          }

          let shows = new List();

          for (let i = 0, len = list.length; i < len; i++) {
            let show = fromParent(doc(list[i]).parent().parent().parent().parent());

            if (show != null) {
              shows.Add(show);
            }
          }

          return shows.Sort((a, b) => a.date - b.date);
        }
      )
    }
  }

  exports = module.exports = Source
})()
