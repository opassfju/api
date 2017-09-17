'use strict';
const async = require('async');
const message = require('../../../tools/message');
const util = require('../../../tools/util');

const action = (actionPayload) => {
  let params = actionPayload.request.query;
  let reply = actionPayload.reply;
  let pageObj = util.handlePage(params);
  let output ='';

  let whereStr = util.getWhereStr(
    [ {key:'class_name',param:params['class'], type:'str',match:'partial'},
      {key:'class_teacher',param:params['teacher'], type:'str',match:'partial'}],
      true); 
  
  async.waterfall([
    (callback) => {
      let query = `SELECT * FROM Comments ${whereStr} ORDER BY create_date DESC`;
      console.log(query);
      util.executeDBWithCallback(query,callback);
    },
    (comment_res,callback) => {
      
      if ( util.checkArrayLength(comment_res) <= 0) {
        callback({code:204},null);
      }
      else {
        output = comment_res;
        let query = 'SELECT COUNT(id) sum FROM Comments';
        util.executeDBWithCallback(query,callback);
      }
    },
  ], function (err, results) {
    console.log('END:',err,results);
    if (!err){

      let pages = util.getPages(results[0]['sum']);
      let arrObj = {
        arr : output,
        totalRowCount :results[0]['sum']
      };

      if (!pageObj.pageAll) {
        let res = util.handlePageURL(params, '/comments?page=', output.length, pages, pageObj.paging);
        let pageingObj = {
          paging : res.current,
          pages : pages,
          previous : res.previous,
          next :res.next
        };
        message.MsgListArray(arrObj, pageingObj, reply);
      }
      else {
        message.MsgListArray(arrObj, null, reply);
      }


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



