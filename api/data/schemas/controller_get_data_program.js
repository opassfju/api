'use strict';
const async = require('async');
const message = require('../../../tools/message');
const util = require('../../../tools/util');

const action = (actionPayload) => {
  let params = actionPayload.request.query;
  let reply = actionPayload.reply;

  let whereStr = util.getWhereStr(
    [ {key:'P.name',param:params['name'], type:'str',match:'partial'},
    ],
    false);

  let query = `
    SELECT 
      P.id,
      P.name
    FROM Program P,Section S
    WHERE P.section_id = S.id ${whereStr}`;

//JSON_OBJECT("id",S.id,"name",S.name),

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



