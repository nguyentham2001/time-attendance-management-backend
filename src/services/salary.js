const salaryDao = require('../daos/salary');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const checkMonthExists = async ({ userId, month }) => {
  const salaryExist = await salaryDao.findSalary({
    userId,
    month,
  });

  if (salaryExist) {
    throw new CustomError(errorCodes.SALARY_MONTH_EXIST);
  }
};

const getListSalary = async (condition) => {
  const result = await salaryDao.getListSalary(condition);
  return result;
};

const createSalary = async (data) => {
  const { userId, month } = data;

  await checkMonthExists({ userId, month });

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

module.exports = {
  getListSalary,
  createSalary,
  updateSalary,
  getSalary,
  deleteSalary,
};
