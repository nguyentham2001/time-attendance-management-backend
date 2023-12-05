const Absence = require('../models/absence');
const AbsenceRequest = require('../models/absenceRequest');
const User = require('../models/user');
const { pagination } = require('../utils/pagination');
const { findDocument, parseCondition } = require('./daoUtil');

const getListAbsenceRequests = async ({
  pageNum = 0,
  limit,
  search,
  ...condition
}) => {
  limit = parseInt(limit, 10);
  const match = parseCondition({ ...condition });

  if (search) {
    const searchRegex = new RegExp(search, 'gi');
    match.name = searchRegex;
  }

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = pageNum > 0 ? (pageNum - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const lookupUser = [
    {
      $lookup: {
        from: User.collection.name,
        localField: 'userId',
        foreignField: '_id',
        as: 'userData',
      },
    },
    {
      $unwind: { path: '$userData', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        userId: 0,
      },
    },
    {
      $addFields: {
        user: {
          employeeId: '$userData.employeeId',
          name: '$userData.name',
        },
      },
    },
    {
      $project: {
        userData: 0,
      },
    },
  ];

  const lookupSupervisor = [
    {
      $lookup: {
        from: User.collection.name,
        localField: 'supervisorId',
        foreignField: '_id',
        as: 'supervisorData',
      },
    },
    {
      $unwind: { path: '$supervisorData', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        supervisorId: 0,
      },
    },
    {
      $addFields: {
        supervisor: {
          employeeId: '$supervisorData.employeeId',
          name: '$supervisorData.name',
        },
      },
    },
    {
      $project: {
        supervisorData: 0,
      },
    },
  ];

  const lookupAbsence = [
    {
      $lookup: {
        from: Absence.collection.name,
        localField: 'absenceId',
        foreignField: '_id',
        as: 'absenceData',
      },
    },
    {
      $unwind: { path: '$absenceData', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        absenceId: 0,
      },
    },
    {
      $addFields: {
        absence: {
          name: '$absenceData.name',
        },
      },
    },
    {
      $project: {
        absenceData: 0,
      },
    },
  ];

  const [queryResult] = await AbsenceRequest.aggregate([
    {
      $match: match,
    },
    ...lookupUser,
    ...lookupSupervisor,
    ...lookupAbsence,
    {
      $facet: {
        result: [{ $skip: offset }, ...limitQuery],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);
  const { result, totalCount } = queryResult;
  const total = totalCount[0] ? totalCount[0].count : 0;

  if (limit) {
    return pagination({ data: result, totalCount: total, pageNum, limit });
  }

  return { data: result, totalCount: total };
};

const createAbsenceRequest = async (data) => {
  const absenceRequest = await AbsenceRequest.create(data);
  return absenceRequest;
};

const findAbsenceRequest = async (condition) => {
  const absenceRequest = await findDocument(AbsenceRequest, condition);
  return absenceRequest;
};

const updateAbsenceRequest = async (id, data) => {
  const absenceRequest = await AbsenceRequest.findByIdAndUpdate(id, data, {
    new: true,
  });
  return absenceRequest;
};

const deleteAbsenceRequest = async (id) => {
  await AbsenceRequest.findByIdAndDelete(id);
};

module.exports = {
  createAbsenceRequest,
  findAbsenceRequest,
  updateAbsenceRequest,
  deleteAbsenceRequest,
  getListAbsenceRequests,
};
