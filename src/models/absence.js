const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema(
  {
    name: String,
    total: Number,
    limited: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Absence', absenceSchema);
