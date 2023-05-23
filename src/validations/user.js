const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const getUsers = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

const deleteUser = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

module.exports = {
  getUsersValidate: customValidate(getUsers),
  deleteUserValidate: customValidate(deleteUser),
};
