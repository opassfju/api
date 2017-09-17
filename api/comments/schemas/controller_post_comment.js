'use strict';
const async = require('async');
const message = require('../../../tools/message');
const util = require('../../../tools/util');
const query = require('./query_comment');
const getSingle = require('./controller_get_comment');

const action = (actionPayload) => {

  let payload = actionPayload.request.payload;
  let reply = actionPayload.reply;
  payload['fudaer_id'] = actionPayload.decodedData.fudaerID;
  
  async.waterfall([
    (callback) => {
      console.log(query);
      util.executeDBWithCallback(query.Post(payload),callback);
    }
  ], function (err, results) {
    console.log('END:',err,results);
    if (!err){
      actionPayload.request['params']['id'] = results.insertId;
      getSingle.action(actionPayload, reply);
    }
    else {
      switch (err.code) {
      case 204:
        message.MsgNoContent(reply);
        break;
      default:
        message.ErrorBadImplementation('system_db_operation_failed',reply);
      }
    }
  });

};

module.exports = {
  action: action
};



