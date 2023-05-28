const userService = require('../services/user');

async function getUser(req, res) {
  return res.send({ status: 1, result: req.user });
}

const getListUsers = async (req, res) => {
  const result = await userService.getListUsers({ ...req.query });
  return res.send({ status: 1, result });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);
  return res.send({ status: 1, result: user });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const result = await userService.deleteUser(userId);
  return res.send({ status: 1, result });
};

module.exports = { getUser, getListUsers, updateUser, deleteUser };
