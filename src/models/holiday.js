const mongoose = require('mongoose');
const { HOLIDAY_TYPE } = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const holidaySchema = new mongoose.Schema(
  {
    date: Date,
    type: {
      type: String,
      enum: Object.values(HOLIDAY_TYPE),
    },
    note: String,
    excludeDepartments: [
      {
        type: ObjectId,
        ref: 'Department',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Holiday', holidaySchema);
