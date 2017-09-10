'use strict';
const database = require('../../../tools/database');
const message = require('../../../tools/message');
const getSingle = require('./controller_get_fudaer'); 
const query = require('./query_fudaer');

const action = (actionPayload) => {

  let decodedData = actionPayload.decodedData;
  let payload = actionPayload.request.payload;
  let reply = actionPayload.reply;

  let connection = database.initiate();

  if (payload.hasOwnProperty('department')) {
    payload['department_id'] = payload['department'];
  }

  if (payload.hasOwnProperty('miner')) {
    payload['miner_id'] = payload['miner'];
  }

  if (payload.hasOwnProperty('sec_major')) {
    payload['sec_major_id'] = payload['sec_major'];
  }

  if (payload.hasOwnProperty('section')) {
    payload['section_id'] = payload['section'];
  }

  if (payload.hasOwnProperty('program')) {
    payload['program_id'] = payload['program'];
  }


  connection.query(query.PatchString(decodedData.fudaerID,payload), (error) => {
    if (error) {
      database.terminate(connection);
      message.ErrorBadImplementation('system_db_bad_query',reply);
    }
    else {
      getSingle.action(actionPayload, reply);
    }
  });
  database.terminate(connection);
};


module.exports = {
  action: action
};
