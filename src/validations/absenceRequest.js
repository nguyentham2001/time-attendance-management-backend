const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');
const { ABSENCE_REQUEST_TYPE } = require('../constants');

const validRequestType = Object.values(ABSENCE_REQUEST_TYPE);

const createAbsenceRequest = {
  body: Joi.object({
    supervisorId: Joi.string().trim().required(),
    absenceId: Joi.string().trim().required(),
    requestType: Joi.string()
      .valid(...validRequestType)
      .required(),
    fromDate: Joi.date().required(),
    toDate: Joi.when('requestType', {
      is: ABSENCE_REQUEST_TYPE.DAY,
      then: Joi.date().min(Joi.ref('fromDate')).required(),
      otherwise: Joi.forbidden(),
    }),
    reason: Joi.string().trim().required(),
    handoverWork: Joi.string().trim(),
  }),
};

const updateAbsenceRequest = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    supervisorId: Joi.string().trim(),
    absenceId: Joi.string().trim(),
    requestType: Joi.string().valid(...validRequestType),
    fromDate: Joi.date().required(),
    toDate: Joi.when('requestType', {
      is: ABSENCE_REQUEST_TYPE.DAY,
      then: Joi.date().min(Joi.ref('fromDate')).required(),
      otherwise: Joi.forbidden(),
    }),
    reason: Joi.string().trim(),
    handoverWork: Joi.string().trim(),
  }),
};

const getAbsenceRequest = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const deleteAbsenceRequest = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

const getAbsenceRequests = {
  query: Joi.object({
    search: Joi.string(),
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createAbsenceRequestValidate: customValidate(createAbsenceRequest),
  updateAbsenceRequestValidate: customValidate(updateAbsenceRequest),
  getAbsenceRequestValidate: customValidate(getAbsenceRequest),
  deleteAbsenceRequestValidate: customValidate(deleteAbsenceRequest),
  getAbsenceRequestsValidate: customValidate(getAbsenceRequests),
};
