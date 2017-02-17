'use strict';

const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"});
const ddb = new AWS.DynamoDB.DocumentClient();

const channels = process.env.CHANNELS.split(',').map(string => string.trim());
const Tatort = require('tatort');
const t = new Tatort('tvdirekt');

const createDynamoDBRequest = function(item) {
  const channel = item.channel.replace(' RP', '');
  const date = item.date.clone().tz("UTC").format();

  return {
    PutRequest: {
      Item: {
        show: "tatort",
        uuid: date + "@" + channel,
        date: date,
        channel: channel,
        episode: item.name
      }
    }
  };
};

const handler = function(event, context, callback) {
  t.list().then(list => {
    let data = list.data.filter(
      item => channels.indexOf(item.channel) !== -1
    ).map(
      createDynamoDBRequest
    )

    ddb.batchWrite({ RequestItems: { [process.env.STAGE + '-episodes']: data } },
      error => error && callback(error) || callback(null, data)
    );
  });
};

module.exports.handler = handler;
