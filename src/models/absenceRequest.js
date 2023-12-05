const mongoose = require('mongoose');
const {
  ABSENCE_REQUEST_TYPE,
  ABSENCE_REQUEST_STATUS,
} = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const absenceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    supervisorId: {
      type: ObjectId,
      ref: 'User',
    },
    absenceId: {
      type: ObjectId,
      ref: 'Absence',
    },
    requestType: {
      type: String,
      enum: Object.values(ABSENCE_REQUEST_TYPE),
      default: ABSENCE_REQUEST_TYPE.DAY,
    },
    fromDate: Date,
    toDate: Date,
    totalDay: Number,
    reason: String,
    handoverWork: String,
    status: {
      type: String,
      enum: Object.values(ABSENCE_REQUEST_STATUS),
      default: ABSENCE_REQUEST_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('AbsenceRequest', absenceRequestSchema);
