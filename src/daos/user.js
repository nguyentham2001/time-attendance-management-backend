const User = require('../models/user');
const { pagination } = require('../utils/pagination');
const { findDocument, parseCondition } = require('./daoUtil');

const hideUserSensitiveFields = (user) => {
  delete user.password;
  delete user.salt;
};

const getListUsers = async ({ pageNum = 0, limit, search, ...condition }) => {
  limit = parseInt(limit, 10);
  const match = parseCondition({ ...condition });

  if (search) {
    const searchRegex = new RegExp(search, 'gi');
    match.$or = [
      { name: { $regex: searchRegex } },
      { phoneNumber: { $regex: searchRegex } },
    ];
  }

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = pageNum > 0 ? (pageNum - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const [queryResult] = await User.aggregate([
    {
      $match: match,
    },
    {
      $project: {
        password: 0,
        salt: 0,
      },
    },
    {
      $facet: {
        result: [
          { $sort: { createdAt: -1 } },
          { $skip: offset },
          ...limitQuery,
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);
  const { result, totalCount } = queryResult;
  const total = totalCount[0] ? totalCount[0].count : 0;

  if (limit) {
    return pagination({ data: result, totalCount: total, pageNum, limit });
  }

  return { data: result, totalCount: total };
};

const createUser = async (data) => {
  let user = await User.create(data);

  user = { ...user.toJSON() };
  hideUserSensitiveFields(user);

  return user;
};

const findUser = async (condition, { hideSensitiveFields = true } = {}) => {
  const user = await findDocument(User, condition);

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

module.exports = { getListUsers, createUser, findUser, updateUser, deleteUser };
