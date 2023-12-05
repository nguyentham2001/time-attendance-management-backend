const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const createPosition = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    rank: Joi.number().min(1).max(5).required(),
  }),
};

const updatePosition = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    rank: Joi.number().min(1).max(5),
  }),
};

const getPosition = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deletePosition = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getPositions = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createPositionValidate: customValidate(createPosition),
  updatePositionValidate: customValidate(updatePosition),
  getPositionValidate: customValidate(getPosition),
  deletePositionValidate: customValidate(deletePosition),
  getPositionsValidate: customValidate(getPositions),
};
