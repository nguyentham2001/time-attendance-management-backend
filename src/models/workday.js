const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const workdaySchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    date: Date,
    firstEntry: String,
    firstOut: String,
    secondEntry: String,
    secondOut: String,
    thirdEntry: String,
    thirdOut: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Workday', workdaySchema);
