var assert = require('assert');

exports.handle = (event, context, callback) => {
  assert(event.session, 'Invalid event payload');
  assert(event.session.application, 'Invalid event payload');
  assert(event.session.application.applicationId == process.env.APP_ID, "Invalid application ID");

  var intent = event.request.intent.name.toLowerCase();
  if (['next', 'check'].indexOf(intent) === -1) {
    return callback();
  }

  require('./intents/' + intent + '.js')(
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
