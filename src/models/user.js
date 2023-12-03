const mongoose = require('mongoose');
const { GENDER } = require('../constants');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    employeeId: String,
    name: String,
    phoneNumber: String,
    email: String,
    gender: {
      type: String,
      enum: Object.values(GENDER),
      default: GENDER.MALE,
    },
    avatar: String,
    address: String,
    placeOfBirth: String,
    dateOfBirth: Date,
    identityNumber: String,
    issuedOn: Date,
    issuedBy: String,
    signingDate: Date,
    workingDate: Date,
    bankAccount: String,
    bank: String,
    education: String,
    positionId: {
      type: ObjectId,
      ref: 'Position',
    },
    departmentId: {
      type: ObjectId,
      ref: 'Department',
    },
    salt: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
