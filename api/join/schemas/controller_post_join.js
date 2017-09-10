'use strict';
const config = require('config');
const async = require('async');
const mailer = require('../../../tools/mailer');
const message = require('../../../tools/message');
const signJWT = require('../../../tools/signJWT');
const util = require('../../../tools/util');

const action = (data, reply) => {
  let queryCheckEmail = `SELECT id,email,verified FROM Fudaer WHERE email="${data.email}"`;
  let queryCreateFudaer = 'INSERT INTO Fudaer SET email = ?,password = SHA2(?, 256)';
  let fudaerID = '';
  async.waterfall([
    (callback) => {
      // STEP (1) check if email in used 
      console.log('[JOIN] STEP (1) check if email in used ');
      util.executeDBWithCallback(queryCheckEmail,callback);
    },
    (emailCheck,callback) => {
      
      if (emailCheck.length > 0 ){

        if (emailCheck[0].verified === 0) {
          // if target fudaer already created and unverified
          let url = createVerifiedURL(emailCheck[0].id,emailCheck[0].email);
          send_email(emailCheck[0].email, url, reply);
          callback({code:900,msg:'resent_verified_email'});
        }
        else {
          callback({code:400,msg:'email_in_used'});
        }
      }
      else {
        // STEP (2) created new Fudaer
        console.log('[JOIN] (2) created new Fudaer ');
        util.executeDBWithPayloadCallback(queryCreateFudaer,[data.email,data.password],callback);
      }
    },
    (fudaer, callback) => {
      // STEP (4) send email
      fudaerID = fudaer.insertId ;
      console.log('[JOIN] (4) send email ');
      let url = createVerifiedURL(fudaerID,data.email);
      send_email(data.email, url, reply);
      callback(null);
    }
  ], function (err, result) {
    console.log('[SYSTEM] Fudaer created | ',err,result);

    if (err) {
      switch (err.code) {
      case 400:
        message.ErrorCustomBadRequest(err.msg,reply);
        break;
      case 500:
        message.ErrorBadImplementation(err.msg,reply);
        break;
      }
    }

  });
};


function createVerifiedURL (fudaerID,email) {

  let signData = signJWT.emailData;

  signData.fudaerID = fudaerID;
  signData.email = email;
  let token = signJWT.sign('emailVerification', signData);
  let url = `${config.commons.serverURL}/fudaers/${fudaerID}/confirm_verification/${token}`;
  return url;

}


function send_email (mailTarget, url, reply) {
  // send certification mail
  let option = {
    to : mailTarget,
    subject : '[OPASS FJU] 歡迎加入 OPASS FJU !',
    text : `
凹凹！ 你好！\n

歡迎加入 OPASS FJU，請點選下方認證連結，完成註冊。\n

認證連結：\n
${url}\n

當你收到這封信，請在兩天內點選上方連結，即可完成身分認證，無需回信。\n
如果有任何問題，歡迎來信 helper@xxxx.gmail\n`,
    html : ''
  };
  mailer.send(option, reply);
}

module.exports = {
  action: action
};
