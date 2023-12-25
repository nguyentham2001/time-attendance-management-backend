const overtimeService = require('../services/overtime');

const createOvertime = async (req, res) => {
  const { _id: userId } = req.user;
  const overtime = await overtimeService.createOvertime({
    ...req.body,
    userId,
  });

  return res.send({ status: 1, result: overtime });
};

const updateOvertime = async (req, res) => {
  const { id } = req.params;
  const overtime = await overtimeService.updateOvertime(id, req.body);

  return res.send({ status: 1, result: overtime });
};

const getOvertime = async (req, res) => {
  const { id } = req.params;
  const overtime = await overtimeService.getOvertime(id);

  return res.send({ status: 1, result: overtime });
};

const deleteOvertime = async (req, res) => {
  const { id } = req.params;
  const overtime = await overtimeService.deleteOvertime(id);

  return res.send({ status: 1, result: overtime });
};

const getListOvertimes = async (req, res) => {
  const result = await overtimeService.getListOvertimes({
    ...req.query,
  });

  return res.send({ status: 1, result });
};

module.exports = {
  createOvertime,
  updateOvertime,
  getOvertime,
  deleteOvertime,
  getListOvertimes,
};
