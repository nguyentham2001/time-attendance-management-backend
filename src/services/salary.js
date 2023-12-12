const salaryDao = require('../daos/salary');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const getListSalaries = async (condition) => {
  const result = await salaryDao.getListSalaries(condition);
  return result;
};

const createSalary = async (data) => {
  const salary = await salaryDao.createSalary(data);
  return salary;
};

const updateSalary = async (id, data) => {
  const salary = await salaryDao.findSalary(id);
  if (!salary) {
    throw new CustomError(errorCodes.SALARY_NOT_FOUND);
  }

  const salaryUpdate = await salaryDao.updateSalary(id, data);
  return salaryUpdate;
};

const getSalary = async (condition) => {
  const salary = await salaryDao.findSalary(condition);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_NOT_FOUND);
  }

  return salary;
};

const deleteSalary = async (id) => {
  const salary = await salaryDao.findSalary(id);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_NOT_FOUND);
  }

  await salaryDao.deleteSalary(id);

  return salary;
};

const activeSalary = async (salaryId) => {
  let salary = await salaryDao.findSalary(salaryId);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_NOT_FOUND);
  }

  const { userId } = salary;

  await salaryDao.updateManySalary({ userId }, { activated: false });
  salary = await salaryDao.updateSalary(salaryId, { activated: true });

  return salary;
};

module.exports = {
  getListSalaries,
  createSalary,
  updateSalary,
  getSalary,
  deleteSalary,
  activeSalary,
};
