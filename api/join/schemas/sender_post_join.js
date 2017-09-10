'use strict';
const config = require('config');
const mailer = require('../../../tools/mailer');
const mailerConf = config.get('email');


let sendMail =  (mailTarget, url, reply) => {
  // send certification mail
  let option = {
    to : mailTarget,
    subject : mailerConf.messageReg.subject,
    text : mailerConf.messageReg.text + '\n' + url,
    html : ''
  };
  mailer.send(option, reply);
};

module.exports = {
  sendMail: sendMail
};
