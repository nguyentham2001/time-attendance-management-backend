const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const createAbsence = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    total: Joi.number().required(),
    limited: Joi.bool().default(true),
  }),
};

const updateAbsence = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    total: Joi.number(),
    limited: Joi.bool(),
  }),
};

const getAbsence = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteAbsence = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getAbsences = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createAbsenceValidate: customValidate(createAbsence),
  updateAbsenceValidate: customValidate(updateAbsence),
  getAbsenceValidate: customValidate(getAbsence),
  deleteAbsenceValidate: customValidate(deleteAbsence),
  getAbsencesValidate: customValidate(getAbsences),
};
