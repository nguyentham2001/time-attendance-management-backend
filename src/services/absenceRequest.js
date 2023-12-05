const absenceRequestDao = require('../daos/absenceRequest');
const absenceDao = require('../daos/absence');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { diffTime } = require('../utils/date');
const {
  ABSENCE_REQUEST_TYPE,
  ABSENCE_REQUEST_STATUS,
} = require('../constants');

const checkDateConflicts = async ({
  requestType,
  fromDate,
  toDate,
  excludeRequestId,
}) => {
  let condition;
  if (requestType !== ABSENCE_REQUEST_TYPE.DAY) {
    condition = {
      $or: [
        {
          requestType,
          fromDate: { $eq: new Date(fromDate) },
        },
        {
          requestType: ABSENCE_REQUEST_TYPE.DAY,
          fromDate: { $lte: new Date(fromDate) },
          toDate: { $gte: new Date(fromDate) },
        },
      ],
    };
  } else {
    condition = {
      $or: [
        {
          requestType: {
            $in: [ABSENCE_REQUEST_TYPE.MORNING, ABSENCE_REQUEST_TYPE.AFTERNOON],
          },
          fromDate: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
        // overlap range
        {
          requestType: ABSENCE_REQUEST_TYPE.DAY,
          fromDate: { $lte: new Date(toDate) },
          toDate: { $gte: new Date(fromDate) },
        },
      ],
    };
  }

  if (excludeRequestId) {
    condition = {
      _id: { $ne: excludeRequestId },
      ...condition,
    };
  }

  const requestExists = await absenceRequestDao.findAbsenceRequest(condition);
  if (requestExists) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_DAY_CONFLICT);
  }
};

const createAbsenceRequest = async (data) => {
  const { absenceId, requestType, fromDate, toDate } = data;
  const absence = await absenceDao.findAbsence(absenceId);

  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  await checkDateConflicts({
    requestType,
    fromDate,
    toDate,
  });

  const { total } = absence;

  let totalDayRequest = 0.5;
  if (toDate) {
    totalDayRequest = diffTime(fromDate, toDate, 'day') + 1;
  }

  if (totalDayRequest > total) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_DAY_GREATER_MAX);
  }

  // TODO: check total day greater max day

  const absenceRequest = await absenceRequestDao.createAbsenceRequest(data);
  return absenceRequest;
};

const updateAbsenceRequest = async (id, data) => {
  const absenceRequest = await absenceRequestDao.findAbsenceRequest(id);
  if (!absenceRequest) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_NOT_FOUND);
  }

  const { absenceId, requestType, fromDate, toDate } = data;
  const absence = await absenceDao.findAbsence(absenceId);

  if (!absence) {
    throw new CustomError(errorCodes.ABSENCE_NOT_FOUND);
  }

  await checkDateConflicts({
    requestType,
    fromDate,
    toDate,
    excludeRequestId: id,
  });

  const { total } = absence;

  let totalDayRequest = 0.5;
  if (toDate) {
    totalDayRequest = diffTime(fromDate, toDate, 'day') + 1;
  }

  if (totalDayRequest > total) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_DAY_GREATER_MAX);
  }

  // TODO: check total day greater max day

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

  const { status } = absenceRequest;
  if (status === ABSENCE_REQUEST_STATUS.APPROVED) {
    throw new CustomError(errorCodes.ABSENCE_REQUEST_NOT_ALLOW_DELETE);
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
