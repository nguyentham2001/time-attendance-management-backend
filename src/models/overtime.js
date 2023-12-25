const mongoose = require('mongoose');
const { OVERTIME_TYPE, OVERTIME_STATUS } = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const overtimeSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    supervisorId: {
      type: ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(OVERTIME_TYPE),
      default: OVERTIME_TYPE.OVERTIME,
    },
    date: Date,
    startTime: String,
    endTime: String,
    reason: String,
    status: {
      type: String,
      enum: Object.values(OVERTIME_STATUS),
      default: OVERTIME_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Overtime', overtimeSchema);
