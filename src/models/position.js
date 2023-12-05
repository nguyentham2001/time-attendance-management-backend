const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema(
  {
    name: String,
    rank: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Position', positionSchema);
