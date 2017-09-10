'use strict';
const nodemailer = require('nodemailer');
const config = require('config');
const mailerConf = config.get('email');
const message = require('./message');

module.exports = {

  'send': (option,reply) =>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailerConf.sender.name,
        pass: mailerConf.sender.password
      }
    });

    let mailOptions =  {
      from: mailerConf.sender.from, // sender address
      to: option.to, // list of receivers
      subject: option.subject, // Subject line
      text: option.text, // plain text body
      html: option.html // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        message.ErrorSendEmailFailed(mailOptions.to, reply);
        return console.log(error);
      }
      console.log('Message sent: %s', info.response);
      message.MsgOK(reply);
    });
  }
};
