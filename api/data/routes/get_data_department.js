'use strict';
const validator = require('../schemas/validator_get_data_department');
const controller = require('../schemas/controller_get_data_department');

module.exports = {
  method: 'GET',
  path: '/data/department',
  config: {
    description: 'List department',
    tags: ['department'],
    response: {
      schema: validator.response
    },
    auth: false
  },
  handler: (request, reply) => {
    controller.action(reply);
  }
};
