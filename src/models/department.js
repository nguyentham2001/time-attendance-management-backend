const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Department', departmentSchema);
