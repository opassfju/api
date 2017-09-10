'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const keyConf = config.get('privateKeys');


const emailData = {
  fudaerID : '',
  email: ''
};

const loginData = {
  fudaerID : '',
  email: ''
};

const resetPWData = {
  fudaerID : ''
};

const sign = (action, optionData) => {
      // type should be ['emailVerification','login']
  let token;
  switch (action){
  case 'emailVerification':
    token = optionData.fudaerID !== '' && optionData.email !== '' ?
      jwt.sign(optionData, keyConf.emailVerification, { expiresIn: '2 days' }) : false;
    break;
  case 'login':
    token = optionData.fudaerID !== '' ? 
      jwt.sign(optionData, keyConf.login, { expiresIn: '365 days' }) : false;
    break;
  case 'resetPassword':
    token = optionData.fudaerID !== ''  ? 
      jwt.sign(optionData, keyConf.resetPassword, { expiresIn: '1h' }) : false;
    break;
  default:
    token = false;
  }     
  return token;
};

module.exports = {
  emailData:emailData,
  loginData:loginData,
  resetPWData:resetPWData,
  sign: sign
};
