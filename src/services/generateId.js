const { client: redisClient } = require('../utils/redis');
const { ID_SUFFIX_LENGTH } = require('../configs');

const zeroPad = (num, length) => String(num).padStart(length, '0');

const createId = (hardCode, counter) =>
  `${hardCode}${zeroPad(counter, ID_SUFFIX_LENGTH)}`;

const generateId = async ({ alias }) => {
  const hardCode = alias;
  const counterKey = `${hardCode}Counter`;

  let currentCounter = await redisClient.getAsync(counterKey);
  if (currentCounter !== null) {
    const newCounter = await redisClient.incrAsync(counterKey);
    return createId(hardCode, newCounter);
  }

  currentCounter = 1;
  await redisClient.setAsync(counterKey, currentCounter);
  return createId(hardCode, currentCounter);
};

module.exports = generateId;
