const userService = require('../services/user');

async function getUser(req, res) {
  return res.send({ status: 1, result: req.user });
}

const getListUsers = async (req, res) => {
  const result = await userService.getListUsers({ ...req.query });
  return res.send({ status: 1, result });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const result = await userService.deleteUser(userId);
  return res.send({ status: 1, result });
};

module.exports = { getUser, getListUsers, deleteUser };
