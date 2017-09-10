'use strict';
const async = require('async');
const message = require('../../../tools/message');
const util = require('../../../tools/util');

const action = (actionPayload) => {
  let reply = actionPayload.reply;
  let query = 'SELECT * FROM Section';

  async.waterfall([
    (callback) => {
      util.executeDBWithCallback(query,callback);
    }
  ], function (err, results) {
    if (!err){
      let arrObj = {
        arr : results,
        totalRowCount : results.length
      };
      message.MsgListArray(arrObj, null, reply);
    }
    else {
      switch (err.code) {
      default:
        message.ErrorBadImplementation('system_db_operation_failed',reply);
      }
    }
  });


};

module.exports = {
  action: action
};



