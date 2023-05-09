const positionDao = require('../daos/position');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const checkNameExists = async (name) => {
  const positionExist = await positionDao.findPosition({
    name,
  });

  if (positionExist) {
    throw new CustomError(errorCodes.POSITION_NAME_EXIST);
  }
};

const createPosition = async (data) => {
  const { name } = data;

  await checkNameExists(name);

  const position = await positionDao.createPosition(data);
  return position;
};

const updatePosition = async (id, data) => {
  const position = await positionDao.findPosition(id);
  if (!position) {
    throw new CustomError(errorCodes.POSITION_NOT_FOUND);
  }

  const { name } = data;
  if (position.name !== name) {
    await checkNameExists(name);
  }

  const positionUpdate = await positionDao.updatePosition(id, data);
  return positionUpdate;
};

const getListPositions = async (condition) => {
  const result = await positionDao.getListPositions(condition);
  return result;
};

const getPosition = async (condition) => {
  const position = await positionDao.findPosition(condition);

  if (!position) {
    throw new CustomError(errorCodes.POSITION_NOT_FOUND);
  }

  return position;
};

const deletePosition = async (id) => {
  const position = await positionDao.findPosition(id);

  if (!position) {
    throw new CustomError(errorCodes.POSITION_NOT_FOUND);
  }

  await positionDao.deletePosition(id);

  return position;
};

module.exports = {
  createPosition,
  updatePosition,
  getPosition,
  deletePosition,
  getListPositions,
};
