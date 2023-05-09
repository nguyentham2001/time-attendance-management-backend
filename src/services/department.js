const departmentDao = require('../daos/department');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const checkNameExists = async (name) => {
  const departmentExist = await departmentDao.findDepartment({
    name,
  });

  if (departmentExist) {
    throw new CustomError(errorCodes.DEPARTMENT_NAME_EXIST);
  }
};

const createDepartment = async (data) => {
  const { name } = data;

  await checkNameExists(name);

  const department = await departmentDao.createDepartment(data);
  return department;
};

const updateDepartment = async (id, data) => {
  const department = await departmentDao.findDepartment(id);
  if (!department) {
    throw new CustomError(errorCodes.DEPARTMENT_NOT_FOUND);
  }

  const { name } = data;
  if (department.name !== name) {
    await checkNameExists(name);
  }

  const departmentUpdate = await departmentDao.updateDepartment(id, data);
  return departmentUpdate;
};

const getListDepartments = async (condition) => {
  const result = await departmentDao.getListDepartments(condition);
  return result;
};

const getDepartment = async (condition) => {
  const department = await departmentDao.findDepartment(condition);

  if (!department) {
    throw new CustomError(errorCodes.DEPARTMENT_NOT_FOUND);
  }

  return department;
};

const deleteDepartment = async (id) => {
  const department = await departmentDao.findDepartment(id);

  if (!department) {
    throw new CustomError(errorCodes.DEPARTMENT_NOT_FOUND);
  }

  await departmentDao.deleteDepartment(id);

  return department;
};

module.exports = {
  createDepartment,
  updateDepartment,
  getDepartment,
  deleteDepartment,
  getListDepartments,
};
