const userDao = require('../daos/user');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const getListUsers = async (condition) => {
  const result = await userDao.getListUsers(condition);
  return result;
};

const deleteUser = async (id) => {
  const user = await userDao.findUser(id);

  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }

  await userDao.deleteUser(id);

  return user;
};

module.exports = {
  deleteUser,
  getListUsers,
};
