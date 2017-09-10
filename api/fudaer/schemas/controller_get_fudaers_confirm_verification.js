'use strict';
const message = require('../../../tools/message');
const util = require('../../../tools/util');
const async = require('async');

//  let query = 'UPDATE Fudaer SET status = "online" WHERE email = ?';


const action = (decoded, reply) => {
  let email = decoded.email;
  let fudaerID = decoded.fudaerID;

  async.waterfall([
    (callback) => {
      console.log('[VERIFY] (1) check if verified  '); 
      let query = `SELECT id,email FROM Fudaer WHERE email="${email}" AND verified = 1`;
      util.executeDBWithCallback(query,callback);
    },
    (emailCheck, callback) => {
      console.log('[VERIFY] (2) email verified '); 
      if (emailCheck.length >0) {
        callback({code:900,msg:''});
      }
      else {
        let query = `
          UPDATE Fudaer 
          SET verified = 1
          WHERE email = "${email}"`;
        util.executeDBWithCallback(query,callback);
      }
    },
    (updateRes, callback) => {
      console.log('[VERIFY] (3) set role ');
      if (updateRes.length <= 0){
        callback({code:901,msg:email});
      }
      else {
        let queryAddCitizenRole = 'INSERT INTO Fudaer_Role SET ?';
        let qData = {fudaer_id:fudaerID, role_id: 1};
        util.executeDBWithPayloadCallback(queryAddCitizenRole,qData,callback);
      }
    },
    (roleRes,callback) => {
      console.log('[VERIFY] (4) add nickname log ');
      let queryNicknameLog = `INSERT INTO Nickname_Log SET fudaer_id = ${fudaerID},nickname_id=1`;
      util.executeDBWithCallback(queryNicknameLog,callback);
    },
  ], function (err, result) {
    console.log('[SYSTEM] Fudaer email verified | ',err,result);

    if (err) {
      switch (err.code) {
      case 400:
        message.ErrorCustomBadRequest(err.msg,reply);
        break;
      case 500:
        message.ErrorBadImplementation(err.msg,reply);
        break;
      case 900:
        message.MsgCitizenEmailConfirmed(reply);
        break;
      case 901:
        message.ErrorCitizenEmailNotFound(err.msg, reply);
        break;
      }
    }
    else {
      message.MsgCitizenEmailConfirmed(reply);
    }

  });

};

module.exports = {
  action: action
};
