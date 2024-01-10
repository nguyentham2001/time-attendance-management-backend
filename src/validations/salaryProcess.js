const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const createSalaryProcess = {
  body: Joi.object({
    userId: Joi.string().trim().required(),
    salary: Joi.number().required(),
    mealAllowance: Joi.number(),
    petroAllowance: Joi.number(),
    telephoneAllowance: Joi.number(),
    responsibilityAllowance: Joi.number(),
    applyDate: Joi.date().required(),
    dateSalaryUp: Joi.date(),
    note: Joi.string().trim(),
    activated: Joi.bool().default(false),
  }),
};

const updateSalaryProcess = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    salary: Joi.number(),
    mealAllowance: Joi.number(),
    petroAllowance: Joi.number(),
    telephoneAllowance: Joi.number(),
    responsibilityAllowance: Joi.number(),
    applyDate: Joi.date(),
    dateSalaryUp: Joi.date(),
    note: Joi.string().trim(),
  }),
};

const getSalaryProcess = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteSalaryProcess = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getListSalaryProcess = {
  query: Joi.object({
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
    userId: Joi.string(),
  }),
};

const activeSalaryProcess = {
  body: Joi.object({
    salaryProcessId: Joi.string().trim().required(),
  }),
};

module.exports = {
  createSalaryProcessValidate: customValidate(createSalaryProcess),
  updateSalaryProcessValidate: customValidate(updateSalaryProcess),
  getSalaryProcessValidate: customValidate(getSalaryProcess),
  deleteSalaryProcessValidate: customValidate(deleteSalaryProcess),
  getListSalaryProcessValidate: customValidate(getListSalaryProcess),
  activeSalaryProcessValidate: customValidate(activeSalaryProcess),
};
