const Overtime = require('../models/overtime');
const { pagination } = require('../utils/pagination');
const { findDocument, parseCondition } = require('./daoUtil');

const getListOvertimes = async ({ pageNum = 0, limit, ...condition }) => {
  limit = parseInt(limit, 10);
  const match = parseCondition({ ...condition });

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = pageNum > 0 ? (pageNum - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const [queryResult] = await Overtime.aggregate([
    {
      $match: match,
    },
    {
      $set: {
        startDate: { $regexFindAll: { input: '$startTime', regex: /\d+/ } },
      },
    },
    {
      $set: {
        startDate: {
          $dateFromParts: {
            year: 1970,
            month: 1,
            day: 1,
            hour: { $toInt: { $arrayElemAt: ['$startDate.match', 0] } },
            minute: { $toInt: { $arrayElemAt: ['$startDate.match', 1] } },
            second: 0,
          },
        },
      },
    },
    {
      $facet: {
        result: [
          {
            $sort: { date: -1, startDate: -1 },
          },
          {
            $project: { startDate: 0 },
          },
          { $skip: offset },
          ...limitQuery,
        ],
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

const createOvertime = async (data) => {
  const overtime = await Overtime.create(data);
  return overtime;
};

const findOvertime = async (condition) => {
  const overtime = await findDocument(Overtime, condition);
  return overtime;
};

const updateOvertime = async (id, data) => {
  const overtime = await Overtime.findByIdAndUpdate(id, data, {
    new: true,
  });
  return overtime;
};

const deleteOvertime = async (id) => {
  await Overtime.findByIdAndDelete(id);
};

module.exports = {
  createOvertime,
  findOvertime,
  updateOvertime,
  deleteOvertime,
  getListOvertimes,
};
