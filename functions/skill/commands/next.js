(() => {
  'use strict';

  // Am 5. Januar läuft um 20:15 die Folge "Spiel auf Zeit" auf WDR

  const AWS = require("aws-sdk");
  AWS.config.update({region: "eu-west-1"});
  const ddb = new AWS.DynamoDB.DocumentClient();

  const moment = require('moment-timezone');

  Date.prototype.getDateString = function() {
    return this.toISOString().split('T')[0];
  };

  Date.prototype.getTimeString = function() {
    return this.toISOString().split('T')[1].split('.')[0];
  };

  const normalizeShow = show => ({
    name: show.episode,
    date: moment(show.date),
    channel: show.channel
  });

  const next = function() {
    var now = new Date();

    var params = {
      TableName : "episode",
      KeyConditionExpression: "#show = :show and #uuid >= :date",
      ExpressionAttributeNames:{
        "#show": "show",
        "#uuid": "uuid"
      },
      ExpressionAttributeValues: {
        ":show": "tatort",
        ":date": now.getDateString() + 'T' + now.getTimeString()
      },
      Limit: 1
    };

    return new Promise((done) => {
      ddb.query(params, (err, data) => {
        if (!err && data.Items.length === 1) {
          return done(data.Items.pop());
        }

        throw new Error("Unable to get next shows");
      });
    });
  };

  exports = module.exports = (slots, lang) => {
    var L = require(__dirname + '/../locales/' + lang + '.js');

    return next().then(
      show => ({
        name: show.episode,
        date: moment(show.date).tz('Europe/Berlin'),
        channel: show.channel
      })
    ).then(
      item => L.NEXT
        .replace('{day}', item.date.format('D'))
        .replace('{dayth}', item.date.format('Do'))
        .replace('{month}', L.MONTH[item.date.format('M')-1])
        .replace('{name}', item.name)
        .replace('{time}', [item.date.format('HH'), item.date.format('mm')].join(':'))
        .replace('{channel}', item.channel)
    ).then(
      text => ({
        text: text,
        title: L.NEXT_TITLE
      })
    ).catch(
      error => ({
        text: L.NEXT_NONE,
        title: L.NEXT_TITLE
      })
    )
  };
})();
