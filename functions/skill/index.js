var assert = require('assert');

exports.handle = (event, context, callback) => {
  assert(event.session, 'Invalid event payload');
  assert(event.session.application, 'Invalid event payload');
  assert(event.session.application.applicationId == process.env.APP_ID, "Invalid application ID");

  try {
    var intent = require('./intents/' + event.request.intent.name.toLowerCase() + '.js');
  } catch (e) {
    throw new Error('Unknown intent. Only `Next` or `Check` are available!');
  }

  intent(
    event.request.intent.slots, event.request.locale
  ).then(
    res => callback(null, {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": res.text
        },
        "card": {
          "content": res.text,
          "title": res.title,
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
    })
  ).catch(
    err => callback(err)
  )
};
