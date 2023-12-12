const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const createSalary = {
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

const updateSalary = {
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

const getSalary = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteSalary = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getListSalaries = {
  query: Joi.object({
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
    userId: Joi.string(),
  }),
};

const activeSalary = {
  body: Joi.object({
    salaryId: Joi.string().trim().required(),
  }),
};

module.exports = {
  createSalaryValidate: customValidate(createSalary),
  updateSalaryValidate: customValidate(updateSalary),
  getSalaryValidate: customValidate(getSalary),
  deleteSalaryValidate: customValidate(deleteSalary),
  getListSalariesValidate: customValidate(getListSalaries),
  activeSalaryValidate: customValidate(activeSalary),
};
