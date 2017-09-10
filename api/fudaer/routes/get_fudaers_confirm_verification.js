'use strict';
const config = require('config');
const validator = require('../schemas/validator_get_fudaers_confirm_verification');
const controller = require('../schemas/controller_get_fudaers_confirm_verification');
const jwt = require('jsonwebtoken');
const message = require('../../../tools/message');

module.exports = {
  method: 'GET',
  path: '/fudaers/{id}/confirm_verification/{token}',
  config: {
    description: 'Verifiy new fudaer ',
    notes: 'To verifiy new account via email',
    tags: ['join','fudaer','email'],
    auth: false,
    response: {
      schema: validator.response
    }
  },
  handler: (request, reply) => {
    decode_token(request.params, reply);
  }
};

function decode_token (data, reply) {
  jwt.verify(data.token, config.privateKeys.emailVerification, (err, decoded)=> {
    if (err) {
      let requestURL = config.commons.serverURL;
      message.MsgEmailVerifyTokenExpired(requestURL, reply);
    }
    else {
      console.log(decoded);
      if (data.id == decoded.fudaerID){
        controller.action(decoded,reply);
      }
      else {
        message.ErrorBadImplementation('system_invalid_token', reply);
      }
    }
  });
}

