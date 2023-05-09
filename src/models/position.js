const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Position', positionSchema);
