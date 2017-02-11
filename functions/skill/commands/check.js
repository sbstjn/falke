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

  const onDate = function(date) {
    var params = {
      TableName : "episode",
      KeyConditionExpression: "#show = :show and begins_with(#uuid, :date)",
      ExpressionAttributeNames:{
        "#show": "show",
        "#uuid": "uuid"
      },
      ExpressionAttributeValues: {
        ":show": "tatort",
        ":date": date.getDateString()
      }
    };

    return new Promise((done, fail) => {
      ddb.query(params, (err, data) => {
        if (!err) {
          return done(data.Items.map(normalizeShow));
        }

        throw new Error("Unable to query. Error:" + JSON.stringify(err));
      });
    });
  };

  exports = module.exports = (slots, lang) => {
    var L = require(__dirname + '/../locales/' + lang + '.js');

    var day = new Date();
    if (['tomorrow', 'morgen'].indexOf(slots.Date.value) > -1) {
      day.setUTCDate(day.getUTCDate() + 1)
    }

    return onDate(day).then(
      list => {
        var text = L.CHECK_NONE;

        if (list.length == 1) {
          text = L.CHECK_ONE;
        }

        if (list.length > 1) {
          text = L.CHECK_MULTIPLE.replace("{count}", list.length);
        }

        return text.replace("{date}", slots.Date.value);
      }
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
    );
  };
})();
