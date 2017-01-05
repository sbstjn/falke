(() => {
  'use strict';

  const Tatort = require('tatort');
  const AWS = require("aws-sdk");

        AWS.config.update({region: "eu-west-1"});

  var ddb = new AWS.DynamoDB.DocumentClient();


  var t = new Tatort('tvdirekt');

  exports.handle = (event, context, callback) => {
    t.list().then(list => {
      let data = list.data.filter(
        item => ['NDR', 'ARD', 'HR', 'WDR', 'SWR RP'].indexOf(item.channel) !== -1
      ).map(item => {
        return {
          PutRequest: {
            Item: {
              show:     "tatort",
              uuid:     item.date.clone().tz("UTC").format() + "@" + item.channel.replace(' RP', ''),
              date:     item.date.clone().tz("UTC").format(),
              channel:  item.channel.replace(' RP', ''),
              episode:  item.name
            }
          }
        };
      }).sort((a, b) => {
        return a.date > b.date;
      });

      ddb.batchWrite({RequestItems: {episode: data}}, (error) => {
        if (error) {
          return callback(error);
        }

        callback(null, data);
      });
    });
  };
})();
