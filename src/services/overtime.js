const overtimeDao = require('../daos/overtime');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { diffTimeFormat } = require('../utils/date');

const checkValidTimes = async ({ startTime, endTime }) => {
  const diff = diffTimeFormat(startTime, endTime);

  if (diff <= 0) {
    throw new CustomError(errorCodes.OVERTIME_TIME_RANGE_INVALID);
  }
};

const createOvertime = async (data) => {
  const { startTime, endTime } = data;
  await checkValidTimes({ startTime, endTime });

  const overtime = await overtimeDao.createOvertime(data);
  return overtime;
};

const updateOvertime = async (id, data) => {
  const { startTime, endTime } = data;
  await checkValidTimes({ startTime, endTime });

  const overtime = await overtimeDao.findOvertime(id);
  if (!overtime) {
    throw new CustomError(errorCodes.OVERTIME_NOT_FOUND);
  }

  const overtimeUpdate = await overtimeDao.updateOvertime(id, data);
  return overtimeUpdate;
};

const getListOvertimes = async (condition) => {
  const result = await overtimeDao.getListOvertimes(condition);
  return result;
};

const getOvertime = async (condition) => {
  const overtime = await overtimeDao.findOvertime(condition);

  if (!overtime) {
    throw new CustomError(errorCodes.OVERTIME_NOT_FOUND);
  }

  return overtime;
};

const deleteOvertime = async (id) => {
  const overtime = await overtimeDao.findOvertime(id);

  if (!overtime) {
    throw new CustomError(errorCodes.OVERTIME_NOT_FOUND);
  }

  await overtimeDao.deleteOvertime(id);

  return overtime;
};

module.exports = {
  createOvertime,
  updateOvertime,
  getOvertime,
  deleteOvertime,
  getListOvertimes,
};
