'use strict';
const async = require('async');
const util = require('../../../tools/util');
const message = require('../../../tools/message');
const signJWT = require('../../../tools/signJWT');

const action = (actionPayload) => {

  let password = actionPayload.request.payload.password;
  let email = actionPayload.request.payload.email;
  let reply = actionPayload.reply;
  let fudaerData = '';
  
  async.waterfall([
    (callback) => {
      let queryEmailCheckVerified = 'SELECT id,email FROM Fudaer WHERE email = ? AND "unverified"';
      util.executeDBWithPayloadCallback(queryEmailCheckVerified, email, callback);

    },
    (cEmailRes, callback) => {

      if (cEmailRes.length > 0){             
        callback('EmailNotVerified');
      }
      else {
        let queryFudaer = ' SELECT id,email FROM Fudaer WHERE email = ? AND password = (SHA2(?, 256))';
        let tPayload =  [email, password];
        util.executeDBWithPayloadCallback(queryFudaer, tPayload, callback);
      }
    },
    (Res, callback) => {

      if (Res.length <= 0){
        /* wrong handle or password */
        callback('ErrorLoginFailed',{reply:reply});
      }
      else {
        fudaerData = Res[0] ;
        let queryCheckRole = `
            SELECT 
              R.name 
            FROM Fudaer_Role FR,Role R
            WHERE FR.fudaer_id = ? AND R.id = FR.role_id;`;
        util.executeDBWithPayloadCallback(queryCheckRole, fudaerData.id, callback);
      }

    },
    (Res, callback) => {

      if (Res.length <= 0){
        callback('ErrorLoginFailed',{reply:reply});
      }
      else {
        let signData = {
          fudaerID: fudaerData.id,
          email: fudaerData.email,
          fudaerRole: Res,
          reply:reply
        };
        callback(null, signData);
      }

    }
  ], function (err, result) {
    if (!err){
      signData(result);
    }
    else {
      errorMsg(err, result);
    }
  });



};

const signData = (item) =>{
  
  /* create login JWT token 
    input object : {
      fudaerID,
      email,
      fudaerRole,
      reply
    }
  */
  let signData = signJWT.loginData;
  signData.fudaerID = item.fudaerID;
  signData.email = item.email;
  let token = signJWT.sign('login', signData);
  message.MsgLogin(token,item.fudaerRole, item.reply);
};


const errorMsg = (err, result) => {
  switch (err){
  case 'ErrorLoginFailed':
    message.ErrorCustomBadRequest('core_citizen_login_failed',result.reply);
    break;
  case 'EmailNotVerified':
    message.ErrorCitizenEmailNotVerified(result.fudaerID, result.reply);
    break;
  }
};

module.exports = {
  action: action
};
