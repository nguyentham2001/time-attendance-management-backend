const salaryService = require('../services/salaryProcess');

const getListSalaryProcess = async (req, res) => {
  const { _id: userId, isAdmin } = req.user;
  const { userId: queryUserId, ...other } = req.query;

  let query = {};
  if (!isAdmin) {
    query = { userId };
  } else if (queryUserId) {
    query = { userId: queryUserId };
  }

  const result = await salaryService.getListSalaryProcess({
    ...query,
    ...other,
  });

  return res.send({ status: 1, result });
};

const createSalaryProcess = async (req, res) => {
  const salary = await salaryService.createSalaryProcess(req.body);

  return res.send({ status: 1, result: salary });
};

const updateSalaryProcess = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.updateSalaryProcess(id, req.body);

  return res.send({ status: 1, result: salary });
};

const getSalaryProcess = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.getSalaryProcess(id);

  return res.send({ status: 1, result: salary });
};

const deleteSalaryProcess = async (req, res) => {
  const { id } = req.params;
  const salary = await salaryService.deleteSalaryProcess(id);

  return res.send({ status: 1, result: salary });
};

const activeSalaryProcess = async (req, res) => {
  const { salaryProcessId } = req.body;
  const salary = await salaryService.activeSalaryProcess(salaryProcessId);

  return res.send({ status: 1, result: salary });
};

module.exports = {
  getListSalaryProcess,
  createSalaryProcess,
  updateSalaryProcess,
  getSalaryProcess,
  deleteSalaryProcess,
  activeSalaryProcess,
};
