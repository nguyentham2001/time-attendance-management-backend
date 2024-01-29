const { Joi } = require('express-validation');

const { customValidate } = require('./validationUtil');
const { PAGE_NUMBER_DEFAULT } = require('../configs');
const { MONTH_REGEX } = require('../utils/regex');
const { APPROVE_STATUS } = require('../constants');

const validApproveStatus = Object.values(APPROVE_STATUS);

const createSalary = {
  body: Joi.object({
    userId: Joi.string().trim().required(),
    month: Joi.string().regex(MONTH_REGEX).trim().required(),
    baseSalary: Joi.number().required(),
    totalNormalWorkDay: Joi.number(),
    totalSalaryOT: Joi.number(),
    totalOTWorkDay: Joi.number(),
    totalONWorkDay: Joi.number(),
    totalNormalWeekendDay: Joi.number(),
    totalOTWeekendDay: Joi.number(),
    totalONWeekendDay: Joi.number(),
    totalOTHoliday: Joi.number(),
    totalONHoliday: Joi.number(),
    totalWorkDay: Joi.number(),
    factSalary: Joi.number(),
    mealAllowance: Joi.number(),
    petroAllowance: Joi.number(),
    telephoneAllowance: Joi.number(),
    vehicleWear: Joi.number(),
    responsibilityAllowance: Joi.number(),
    totalAllowance: Joi.number(),
    totalOtherMoney: Joi.number(),
    totalDiligence: Joi.number(),
    totalInsurance: Joi.number(),
    totalUnionMoney: Joi.number(),
    totalAdvancePayment: Joi.number(),
    totalBonus: Joi.number(),
    totalMinus: Joi.number(),
    totalMoneyOfMonth: Joi.number(),
    approveStatus: Joi.string().valid(...validApproveStatus),
    totalAbsenceHaveSalary: Joi.number(),
  }),
};

const updateSalary = {
  params: Joi.object({
    id: Joi.string().trim().required(),
  }),
  body: Joi.object({
    baseSalary: Joi.number(),
    totalNormalWorkDay: Joi.number(),
    totalSalaryOT: Joi.number(),
    totalOTWorkDay: Joi.number(),
    totalONWorkDay: Joi.number(),
    totalNormalWeekendDay: Joi.number(),
    totalOTWeekendDay: Joi.number(),
    totalONWeekendDay: Joi.number(),
    totalOTHoliday: Joi.number(),
    totalONHoliday: Joi.number(),
    totalWorkDay: Joi.number(),
    factSalary: Joi.number(),
    mealAllowance: Joi.number(),
    petroAllowance: Joi.number(),
    telephoneAllowance: Joi.number(),
    vehicleWear: Joi.number(),
    responsibilityAllowance: Joi.number(),
    totalAllowance: Joi.number(),
    totalOtherMoney: Joi.number(),
    totalDiligence: Joi.number(),
    totalInsurance: Joi.number(),
    totalUnionMoney: Joi.number(),
    totalAdvancePayment: Joi.number(),
    totalBonus: Joi.number(),
    totalMinus: Joi.number(),
    totalMoneyOfMonth: Joi.number(),
    approveStatus: Joi.string().valid(...validApproveStatus),
    totalAbsenceHaveSalary: Joi.number(),
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

const getListSalary = {
  query: Joi.object({
    pageNum: Joi.number().integer().min(0).default(PAGE_NUMBER_DEFAULT),
    limit: Joi.number().integer().min(1),
    userId: Joi.string(),
    month: Joi.string(),
  }),
};

module.exports = {
  createSalaryValidate: customValidate(createSalary),
  updateSalaryValidate: customValidate(updateSalary),
  getSalaryValidate: customValidate(getSalary),
  deleteSalaryValidate: customValidate(deleteSalary),
  getListSalaryValidate: customValidate(getListSalary),
};
