
(() => {
  'use strict';

  var assert = require('assert');

  exports.handle = (event, context, callback) => {
    var intent = 'next';

    // Validate event session
    try {
      assert(event.session, 'Invalid event payload');
      assert(event.session.application, 'Invalid event payload');
      assert(event.session.application.applicationId == process.env.APP_ID, "Invalid application ID");

      // Validate request
      assert(event.request, 'Invalid event payload: ' + JSON.stringify(event.request));
      assert(event.request.intent, 'Invalid event payload: ' + JSON.stringify(event.request));

      intent = event.request.intent.name.toLowerCase();
      assert(['next', 'check'].indexOf(intent) > -1, 'Invalid intent')
    } catch(e) { }

    require('./commands/' + intent + '.js')(
      (event.request && event.request.intent ? event.request.intent.slots : {}),
      (event.request && event.request.locale ? event.request.locale : 'de-DE')
    ).then(
      res => callback(null, response(res.title, res.text))
    ).catch(
      err => callback(err)
    )
  };

  var response = (title, message) => {
    return {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": message
        },
        "card": {
          "content": message,
          "title": title,
          "type": "Simple"
        },
        "reprompt": {
          "outputSpeech": {
            "type": "PlainText",
            "text": ""
          }
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    };
  };

/*
  const AWS = require("aws-sdk");
        AWS.config.update({region: "eu-west-1"});
  const ddb = new AWS.DynamoDB.DocumentClient();
  const moment = require('moment-timezone');

  Date.prototype.getDateString = function() {
    return this.toISOString().split('T')[0];
  }

  Date.prototype.getTimeString = function() {
    return this.toISOString().split('T')[1].split('.')[0];
  }

  const normalizeShow = function(show) {
    return {
      name: show.episode,
      date: moment(show.date),
      channel: show.channel
    };
  }

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

    console.log(params);

    return new Promise((done, fail) => {
      ddb.query(params, (err, data) => {
        if (!err) {
          return done(data.Items.map(normalizeShow));
        }

        fail("Unable to query. Error:" + JSON.stringify(err));
      });
    });
  }

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
          return done(normalizeShow(data.Items.pop()));
        }

        throw new Error("Unable to get next shows");
      });
    });
  };

  exports.handle = (event, context, callback) => {
    onDate(new Date()).then(
      data => callback(null, data)
    ).catch(callback);
    /*
    next().then(
      data => callback(null, data)
    ).catch(callback);
  }; */
})();
