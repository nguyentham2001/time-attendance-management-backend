const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');
const { GENDER } = require('../constants');

const validRequestGender = Object.values(GENDER);

const getUsers = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

const updateUser = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    phoneNumber: Joi.string().trim(),
    email: Joi.string().email().trim().lowercase(),
    gender: Joi.string().valid(...validRequestGender),
    avatar: Joi.string().trim(),
    address: Joi.string().trim(),
    placeOfBirth: Joi.string().trim(),
    dateOfBirth: Joi.date(),
    identityNumber: Joi.string().trim(),
    issuedOn: Joi.date(),
    issuedBy: Joi.string().trim(),
    signingDate: Joi.date(),
    workingDate: Joi.date(),
    positionId: Joi.string().trim(),
    departmentId: Joi.string().trim(),
    password: Joi.string().trim(),
    bankAccount: Joi.string().trim(),
    bank: Joi.string().trim(),
    education: Joi.string().trim(),
  }),
};

const deleteUser = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

module.exports = {
  getUsersValidate: customValidate(getUsers),
  updateUserValidate: customValidate(updateUser),
  deleteUserValidate: customValidate(deleteUser),
};
