const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');

const createDepartment = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const updateDepartment = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim(),
  }),
};

const getDepartment = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteDepartment = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getDepartments = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createDepartmentValidate: customValidate(createDepartment),
  updateDepartmentValidate: customValidate(updateDepartment),
  getDepartmentValidate: customValidate(getDepartment),
  deleteDepartmentValidate: customValidate(deleteDepartment),
  getDepartmentsValidate: customValidate(getDepartments),
};
