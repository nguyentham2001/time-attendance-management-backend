const salaryDao = require('../daos/salaryProcess');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const getListSalaryProcess = async (condition) => {
  const result = await salaryDao.getListSalaryProcess(condition);
  return result;
};

const createSalaryProcess = async (data) => {
  const salary = await salaryDao.createSalaryProcess(data);
  return salary;
};

const updateSalaryProcess = async (id, data) => {
  const salary = await salaryDao.findSalaryProcess(id);
  if (!salary) {
    throw new CustomError(errorCodes.SALARY_PROCESS_NOT_FOUND);
  }

  const salaryUpdate = await salaryDao.updateSalaryProcess(id, data);
  return salaryUpdate;
};

const getSalaryProcess = async (condition) => {
  const salary = await salaryDao.findSalaryProcess(condition);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_PROCESS_NOT_FOUND);
  }

  return salary;
};

const deleteSalaryProcess = async (id) => {
  const salary = await salaryDao.findSalaryProcess(id);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_PROCESS_NOT_FOUND);
  }

  await salaryDao.deleteSalaryProcess(id);

  return salary;
};

const activeSalaryProcess = async (salaryId) => {
  let salary = await salaryDao.findSalaryProcess(salaryId);

  if (!salary) {
    throw new CustomError(errorCodes.SALARY_PROCESS_NOT_FOUND);
  }

  const { userId } = salary;

  await salaryDao.updateManySalaryProcess({ userId }, { activated: false });
  salary = await salaryDao.updateSalaryProcess(salaryId, { activated: true });

  return salary;
};

module.exports = {
  getListSalaryProcess,
  createSalaryProcess,
  updateSalaryProcess,
  getSalaryProcess,
  deleteSalaryProcess,
  activeSalaryProcess,
};
