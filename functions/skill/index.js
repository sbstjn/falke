
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

    const command = require('./commands/' + intent + '.js');

    command(
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
})();
