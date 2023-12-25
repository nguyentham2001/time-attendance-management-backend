const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');
const { OVERTIME_TYPE } = require('../constants');
const { TIME_REGEX } = require('../utils/regex');

const validOvertimeType = Object.values(OVERTIME_TYPE);

const createOvertime = {
  body: Joi.object({
    supervisorId: Joi.string().trim().required(),
    type: Joi.string()
      .valid(...validOvertimeType)
      .required(),
    date: Joi.date().required(),
    startTime: Joi.string().regex(TIME_REGEX).trim().required(),
    endTime: Joi.string().regex(TIME_REGEX).trim().required(),
    reason: Joi.string().trim().required(),
  }),
};

const updateOvertime = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    supervisorId: Joi.string().trim(),
    type: Joi.string().valid(...validOvertimeType),
    date: Joi.date().required(),
    startTime: Joi.string().regex(TIME_REGEX).trim().required(),
    endTime: Joi.string().regex(TIME_REGEX).trim().required(),
    reason: Joi.string().trim(),
  }),
};

const getOvertime = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteOvertime = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getOvertimes = {
  query: Joi.object({
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createOvertimeValidate: customValidate(createOvertime),
  updateOvertimeValidate: customValidate(updateOvertime),
  getOvertimeValidate: customValidate(getOvertime),
  deleteOvertimeValidate: customValidate(deleteOvertime),
  getOvertimesValidate: customValidate(getOvertimes),
};
