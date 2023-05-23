const Position = require('../models/position');
const { pagination } = require('../utils/pagination');
const { findDocument, parseCondition } = require('./daoUtil');

const getListPositions = async ({
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

  const [queryResult] = await Position.aggregate([
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

const createPosition = async (data) => {
  const position = await Position.create(data);
  return position;
};

const findPosition = async (condition) => {
  const position = await findDocument(Position, condition);
  return position;
};

const updatePosition = async (id, data) => {
  const position = await Position.findByIdAndUpdate(id, data, {
    new: true,
  });
  return position;
};

const deletePosition = async (id) => {
  await Position.findByIdAndDelete(id);
};

module.exports = {
  createPosition,
  findPosition,
  updatePosition,
  deletePosition,
  getListPositions,
};
