const userDao = require('../daos/user');
const positionDao = require('../daos/position');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const checkUserExists = async (email) => {
  const userExist = await userDao.findUser({
    email,
  });

  if (userExist) {
    throw new CustomError(errorCodes.USER_EXISTS);
  }
};

const getListUsers = async (condition) => {
  const result = await userDao.getListUsers(condition);
  return result;
};

const updateUser = async (id, data) => {
  let user = await userDao.findUser(id);

  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }

  const { email } = data;
  if (email && user.email !== email) {
    await checkUserExists(email);
  }

  await userDao.updateUser(id, data);

  user = await userDao.getUserInfo(id);

  return user;
};

const deleteUser = async (id) => {
  const user = await userDao.findUser(id);

  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }

  await userDao.deleteUser(id);

  return user;
};

const getUserInfo = async (id) => {
  const user = await userDao.getUserInfo(id);
  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }
  return user;
};

const getListSupervisors = async ({ positionId, departmentId }) => {
  const position = await positionDao.findPosition(positionId);
  if (!position) {
    return [];
  }

  const { rank } = position;

  const { data: higherRankPositions } = await positionDao.getListPositions({
    rank: { $gt: rank },
  });

  const positionIds = higherRankPositions.map(({ _id }) => _id);

  const result = await userDao.getListUsers({
    departmentId,
    positionId: { $in: positionIds },
  });
  return result;
};

module.exports = {
  deleteUser,
  getListUsers,
  updateUser,
  getUserInfo,
  getListSupervisors,
};
