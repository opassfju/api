'use strict';
const database = require('../../../tools/database');
const message = require('../../../tools/message');

const action = (actionPayload) => {

  let decodedData = actionPayload.decodedData;
  let payload = actionPayload.request.payload;
  let reply = actionPayload.reply;


  let connection = database.initiate();
  let queryUpdate = `
    UPDATE 
    Fudaer 
    SET password = SHA2(${payload.new_password}, 256) WHERE id = ${decodedData.fudaerID}`;

  console.log(connection.format(queryUpdate));

  connection.query(queryUpdate, (error, results) => {
    if (error) {
      database.terminate(connection);
      message.ErrorBadImplementation('system_db_bad_query',reply);
    }
    else {
      console.log('!!!!',results);
      if ( results.affectedRows > 0){
        message.MsgChangePassword(reply);
        
      }
      else {
        message.ErrorBadImplementation('system_db_operation_failed',reply);
      }
    }
  });
  database.terminate(connection);

};


module.exports = {
  action: action
};
