'use strict';
const message = require('../../../tools/message');
const util = require('../../../tools/util');
const signJWT = require('../../../tools/signJWT');
const mailer = require('../../../tools/mailer');
const async = require('async');

const action = (actionPayload) => {

  //let decodedData = actionPayload.decodedData;
  let payload = actionPayload.request.payload;
  let reply = actionPayload.reply;


  async.waterfall([
    function (callback) {
      // check email exist
      let query = `SELECT id,email,verified FROM Fudaer WHERE email="${payload.email}"`;
      util.executeDBWithCallback(query, callback);
    },
    function (emailcheck, callback) {
      // send email
      if (emailcheck.length > 0) {

        /* create reset password JWT token */
        let signData = signJWT.resetPWData;
        signData.fudaerID = emailcheck[0]['id'];
        let token = signJWT.sign('resetPassword', signData);
    
        send_email(payload.email, token, reply);


        callback(null, true);
      }
      else {
        callback(null, true);
      }
    }
  ], function (err, res) {
    console.log(err,res);
    message.MsgOK(reply);
  });



};


function send_email (mailTarget, token, reply) {

  let option = {
    to : mailTarget,
    subject : '[OPASS FJU] 你忘記密碼了嗎？ ',
    text : `
你好：\n\n
你剛剛說你忘記密碼了？請點選下方連結，重新設定密碼。\n\n
重新設定密碼連結：\n
https://park.watchout.tw/?reset-password&token=${token}\n\n
當你收到這封信，請在一個小時內點選上方連結，以完成密碼重設，無需回信。\n
如果有任何問題，歡迎來信 helper@xxx.tw\n`,
    html : ''
  };
  mailer.send(option, reply);
}

module.exports = {
  action: action
};
