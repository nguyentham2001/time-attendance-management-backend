const salaryService = require('../services/salary');

const getListSalaries = async (req, res) => {
  const { _id: userId, isAdmin } = req.user;
  const { userId: queryUserId } = req.query;

  let query = {};
  if (!isAdmin) {
    query = { userId };
  } else if (queryUserId) {
    query = { userId: queryUserId };
  }

  const result = await salaryService.getListSalaries(query);

  return res.send({ status: 1, result });
};

const createSalary = async (req, res) => {
  const salary = await salaryService.createSalary(req.body);

  return res.send({ status: 1, result: salary });
};

const updateSalary = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.updateSalary(id, req.body);

  return res.send({ status: 1, result: salary });
};

const getSalary = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.getSalary(id);

  return res.send({ status: 1, result: salary });
};

const deleteSalary = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.deleteSalary(id);

  return res.send({ status: 1, result: salary });
};

const activeSalary = async (req, res) => {
  const { salaryId } = req.body;
  const salary = await salaryService.activeSalary(salaryId);

  return res.send({ status: 1, result: salary });
};

module.exports = {
  getListSalaries,
  createSalary,
  updateSalary,
  getSalary,
  deleteSalary,
  activeSalary,
};
