const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    salary: Number,
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
    responsibilityAllowance: {
      type: Number,
      default: 0,
    },
    applyDate: Date,
    dateSalaryUp: Date,
    note: String,
    activated: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Salary', salarySchema);
