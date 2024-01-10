const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const otherMoney = {
  money: Number,
  applyDate: String,
  note: String,
};

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    baseSalary: Number,
    totalNormalWorkDay: {
      type: Number,
      default: 0,
    },
    totalSalaryOT: {
      type: Number,
      default: 0,
    },
    totalOTWorkDay: {
      type: Number,
      default: 0,
    },
    totalONWorkDay: {
      type: Number,
      default: 0,
    },
    totalNormalWeekendDay: {
      type: Number,
      default: 0,
    },
    totalOTWeekendDay: {
      type: Number,
      default: 0,
    },
    totalONWeekendDay: {
      type: Number,
      default: 0,
    },
    totalOTHoliday: {
      type: Number,
      default: 0,
    },
    totalONHoliday: {
      type: Number,
      default: 0,
    },
    totalWorkDay: {
      type: Number,
      default: 0,
    },
    factSalary: {
      type: Number,
      default: 0,
    },
    mealAllowance: {
      type: Number,
      default: 0,
    },
    petroAllowance: {
      type: Number,
      default: 0,
    },
    telephoneAllowance: {
      type: Number,
      default: 0,
    },
    vehicleWear: {
      type: Number,
      default: 0,
    },
    responsibilityAllowance: {
      type: Number,
      default: 0,
    },
    totalAllowance: {
      type: Number,
      default: 0,
    },
    otherMoneyList: [otherMoney],
    totalOtherMoney: {
      type: Number,
      default: 0,
    },
    totalDiligence: {
      type: Number,
      default: 0,
    },
    totalInsurance: {
      type: Number,
      default: 0,
    },
    totalUnionMoney: {
      type: Number,
      default: 0,
    },
    totalAdvancePayment: {
      type: Number,
      default: 0,
    },
    totalBonus: {
      type: Number,
      default: 0,
    },
    totalMinus: {
      type: Number,
      default: 0,
    },
    totalMoneyOfMonth: {
      type: Number,
      default: 0,
    },
    approveStatus: String,
    paymentStatus: String,
    totalAbsenceHaveSalary: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Salary', salarySchema);
