'use strict';
const database = require('../../../tools/database');
const message = require('../../../tools/message');
const query = require('./query_fudaer');

const action = (actionPayload) => {

  let fudaerID = actionPayload.decodedData.fudaerID;
  let reply = actionPayload.reply;

  let connection = database.initiate();

  connection.query(query.GetSingleString(), fudaerID, (error, results) => {
    if (error) {
      database.terminate(connection);
      console.error(error);
      message.ErrorDBQueryFailed(reply);
    }
    else {
      if (results.length <= 0) {
        message.ErrorObjectNotFound(reply);
      }
      else {
        message.MsgObject(results[0], reply);
      }
    }
  }); 
  database.terminate(connection);
};


module.exports = {
  action: action
};



