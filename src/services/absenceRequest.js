const absenceRequestDao = require('../daos/absenceRequest');
const absenceDao = require('../daos/absence');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { diffTime } = require('../utils/date');
const {
  ABSENCE_REQUEST_STATUS,
  ABSENCE_REQUEST_TYPE,
} = require('../constants');

const createAbsenceRequest = async (data) => {
  const { absenceId, requestType, fromDate, toDate } = data;
  const absence = await absenceDao.findAbsence(absenceId);

  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  const { total } = absence;

  let totalDayRequest = 0.5;
  if (toDate) {
    totalDayRequest = diffTime(fromDate, toDate, 'day') + 1;
  }

  if (totalDayRequest > total) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_DAY_GREATER_MAX);
  }

  // TODO: check duplicate date request

  const createdRequests = await absenceRequestDao.findCreatedAbsenceRequests({
    requestType,
    fromDate,
    toDate,
    status: [
      ABSENCE_REQUEST_STATUS.PENDING,
      ABSENCE_REQUEST_STATUS.CONFIRMED,
      ABSENCE_REQUEST_STATUS.APPROVED,
    ],
  });

  const totalDayCreated = createdRequests.reduce((prev, request) => {
    if (
      [ABSENCE_REQUEST_TYPE.MORNING, ABSENCE_REQUEST_TYPE.AFTERNOON].includes(
        request.requestType,
      )
    ) {
      return prev + 0.5;
    }

    return prev + diffTime(request.fromDate, request.toDate, 'day') + 1;
  }, 0);

  console.log('totalDayCreated: ', totalDayCreated);

  if (totalDayRequest > total - totalDayCreated) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_DAY_GREATER_MAX);
  }

  // const absenceRequest = await absenceRequestDao.createAbsenceRequest(data);
  // return absenceRequest;
  return {};
};

const updateAbsenceRequest = async (id, data) => {
  const absenceRequest = await absenceRequestDao.findAbsenceRequest(id);
  if (!absenceRequest) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_NOT_FOUND);
  }

  const absenceRequestUpdate = await absenceRequestDao.updateAbsenceRequest(
    id,
    data,
  );
  return absenceRequestUpdate;
};

const getListAbsenceRequests = async (condition) => {
  const result = await absenceRequestDao.getListAbsenceRequests(condition);
  return result;
};

const getAbsenceRequest = async (condition) => {
  const absenceRequest = await absenceRequestDao.findAbsenceRequest(condition);

  if (!absenceRequest) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_NOT_FOUND);
  }

  return absenceRequest;
};

const deleteAbsenceRequest = async (id) => {
  const absenceRequest = await absenceRequestDao.findAbsenceRequest(id);

  if (!absenceRequest) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_NOT_FOUND);
  }

  await absenceRequestDao.deleteAbsenceRequest(id);

  return absenceRequest;
};

module.exports = {
  createAbsenceRequest,
  updateAbsenceRequest,
  getAbsenceRequest,
  deleteAbsenceRequest,
  getListAbsenceRequests,
};
