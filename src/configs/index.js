const { A_WEEK } = require('../constants');
const { formatNumber } = require('../utils/number');

const {
  PORT = 3000,

  PEPPER,

  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,

  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
} = process.env;

const MONGO_URI =
  MONGO_USERNAME && MONGO_PASSWORD
    ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`
    : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

module.exports = {
  PORT: PORT || 3000,
  MONGO_URI,
  PEPPER,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: formatNumber(JWT_EXPIRES_TIME, A_WEEK),
};
