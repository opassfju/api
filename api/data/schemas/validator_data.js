'use strict';

const Joi = require('joi');

const parametersName = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().allow(null).notes('無黨籍')
  })
);


const responseList = Joi.alternatives().try(
  Joi.object({
    rows: Joi.array(),
    totalRowCount: Joi.number().integer()
  })
);

module.exports = {
  parametersName: parametersName,
  responseList: responseList
};
