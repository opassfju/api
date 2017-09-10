'use strict';
const database = require('../../../tools/database');
const message = require('../../../tools/message');
//const util = require('../../../tools/util');


const action = (reply) => {
  let connection = database.initiate();
  let query = 'SELECT * FROM Program';

  connection.query(query, (error, results) => {
    if (error) {
      database.terminate(connection);
      console.error(error);
      message.ErrorDBQueryFailed(reply);
    }
    else {
      message.MsgListArray(results,results.length, null, null, null, null, reply);
    }
  }); 
  database.terminate(connection);
};

module.exports = {
  action: action
};



