const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    employeeId: String,
    name: String,
    phoneNumber: String,
    email: String,
    avatar: String,
    address: String,
    dateOfBirth: Date,
    identityNumber: String,
    issuedOn: Date,
    issuedBy: String,
    signingDate: Date,
    workingDate: Date,
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
