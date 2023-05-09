const departmentService = require('../services/department');

const createDepartment = async (req, res) => {
  const department = await departmentService.createDepartment(req.body);

  return res.send({ status: 1, result: department });
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await departmentService.updateDepartment(id, req.body);

  return res.send({ status: 1, result: department });
};

const getDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await departmentService.getDepartment(id);

  return res.send({ status: 1, result: department });
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await departmentService.deleteDepartment(id);

  return res.send({ status: 1, result: department });
};

const getListDepartments = async (req, res) => {
  const result = await departmentService.getListDepartments({
    ...req.query,
  });

  return res.send({ status: 1, result });
};

module.exports = {
  createDepartment,
  updateDepartment,
  getDepartment,
  deleteDepartment,
  getListDepartments,
};
