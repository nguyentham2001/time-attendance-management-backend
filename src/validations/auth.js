const { Joi, validate } = require('express-validation');
const { GENDER } = require('../constants');

const validRequestGender = Object.values(GENDER);

const login = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().required(),
  }),
};

const register = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim(),
    email: Joi.string().email().trim().lowercase().required(),
    gender: Joi.string()
      .valid(...validRequestGender)
      .required(),
    avatar: Joi.string().trim(),
    address: Joi.string().trim(),
    placeOfBirth: Joi.string().trim(),
    dateOfBirth: Joi.date(),
    identityNumber: Joi.string().trim(),
    issuedOn: Joi.date(),
    issuedBy: Joi.string().trim(),
    signingDate: Joi.date(),
    workingDate: Joi.date(),
    positionId: Joi.string().trim().required(),
    departmentId: Joi.string().trim().required(),
    password: Joi.string().trim(),
    bankAccount: Joi.string().trim().required(),
    bank: Joi.string().trim().required(),
    education: Joi.string().trim(),
  }),
};

module.exports = {
  loginValidate: validate(login, { keyByField: true }),
  registerValidate: validate(register, { keyByField: true }),
};
