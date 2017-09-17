'use strict';
const async = require('async');
const message = require('../../../tools/message');
const util = require('../../../tools/util');
const query = require('./query_comment');

const action = (actionPayload) => {
  let param = actionPayload.request.params.id;
  let reply = actionPayload.reply;

  let whereStr = util.getWhereStr(
    [ {key:'id',param:param, type:'int',match:'exact'}],
      true); 
  
  async.waterfall([
    (callback) => {
      console.log(query.GetSingle(whereStr));
      util.executeDBWithCallback(query.GetSingle(whereStr),callback);
    },
    (comment_res,callback) => {
      
      if ( util.checkArrayLength(comment_res) <= 0) {
        callback({code:204},null);
      }
      else {
        callback(null,comment_res);
      }
    },
  ], function (err, results) {
    console.log('END:',err,results);
    if (!err){
      message.MsgObject(results[0], reply);
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



