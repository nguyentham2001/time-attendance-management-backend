const absenceDao = require('../daos/absence');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const checkNameExists = async (name) => {
  const absenceExist = await absenceDao.findAbsence({
    name,
  });

  if (absenceExist) {
    throw new CustomError(errorCodes.ABSENCE_NAME_EXIST);
  }
};

const createAbsence = async (data) => {
  const { name } = data;

  await checkNameExists(name);

  const position = await absenceDao.createAbsence(data);
  return position;
};

const updateAbsence = async (id, data) => {
  const absence = await absenceDao.findAbsence(id);
  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  const { name } = data;
  if (absence.name !== name) {
    await checkNameExists(name);
  }

  const absenceUpdate = await absenceDao.updateAbsence(id, data);
  return absenceUpdate;
};

const getListAbsences = async (condition) => {
  const result = await absenceDao.getListAbsences(condition);
  return result;
};

const getAbsence = async (condition) => {
  const absence = await absenceDao.findAbsence(condition);

  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  return absence;
};

const deleteAbsence = async (id) => {
  const absence = await absenceDao.findAbsence(id);

  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  await absenceDao.deleteAbsence(id);

  return absence;
};

module.exports = {
  createAbsence,
  updateAbsence,
  getAbsence,
  deleteAbsence,
  getListAbsences,
};
