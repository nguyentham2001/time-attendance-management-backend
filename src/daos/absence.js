const Absence = require('../models/absence');
const { pagination } = require('../utils/pagination');
const { findDocument, parseCondition } = require('./daoUtil');

const getListAbsences = async ({
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

  const [queryResult] = await Absence.aggregate([
    {
      $match: match,
    },
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

const createAbsence = async (data) => {
  const absence = await Absence.create(data);
  return absence;
};

const findAbsence = async (condition) => {
  const absence = await findDocument(Absence, condition);
  return absence;
};

const updateAbsence = async (id, data) => {
  const absence = await Absence.findByIdAndUpdate(id, data, {
    new: true,
  });
  return absence;
};

const deleteAbsence = async (id) => {
  await Absence.findByIdAndDelete(id);
};

module.exports = {
  createAbsence,
  findAbsence,
  updateAbsence,
  deleteAbsence,
  getListAbsences,
};
