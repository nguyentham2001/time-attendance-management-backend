const User = require('../models/user');
const { findDocument } = require('./daoUtil');

const hideUserSensitiveFields = (user) => {
  delete user.password;
  delete user.salt;
};

const createUser = async (data) => {
  let user = await User.create(data);

  user = { ...user.toJSON() };
  hideUserSensitiveFields(user);

  return user;
};

const findUser = async (condition, { hideSensitiveFields = true } = {}) => {
  const user = findDocument(User, condition);

  if (user == null) return null;

  if (hideSensitiveFields) {
    hideUserSensitiveFields(user);
  }

  return user;
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = { createUser, findUser, updateUser, deleteUser };
