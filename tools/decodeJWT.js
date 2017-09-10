const jwt = require('jsonwebtoken');
const config = require('config');
const message = require('./message');
const bouncer = require('./bouncer');

/*
 * Input :
 *   |   Key      |        Type      |       Description     
 *   | request    | Object           | http request object
 *   | bounce     | boolen           | the api required bouncer or not
 *   | role       | array of obecjt  | the api role 
 *   | controller | object           | controller object
 *   | reply      | object           | Hapi reply object
 */
let decode = (request, bounce, role,controller, reply) => {
  jwt.verify(request.headers.authorization, config.privateKeys.login, (err, decoded) => {
    if (err) {
      console.log(err);
      message.ErrorInvalidToken(reply);
    }
    else {

      let actionPayload = {
        decodedData: decoded,
        request: request,
        reply: reply
      };

      if (bounce) {
        bouncer.bounce(role, controller.action, actionPayload);
      } else {
        controller.action(actionPayload);
      }
      
    }
  });

};

let resetPassword = (request, controller, reply) => {
  jwt.verify(request.headers.authorization, config.privateKeys.resetPassword, (err, decoded) => {
    if (err) {
      console.log(err);
      message.ErrorInvalidToken(reply);
    }
    else {

      let actionPayload = {
        decodedData: decoded,
        request: request,
        reply: reply
      };

      controller.action(actionPayload);
      
    }
  });

};



module.exports = {
  decode:decode,
  resetPassword:resetPassword
};
