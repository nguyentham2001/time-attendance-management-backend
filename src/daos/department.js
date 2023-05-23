const Department = require('../models/department');
const { pagination } = require('../utils/pagination');
const { findDocument } = require('./daoUtil');
const { parseCondition } = require('./daoUtil');

const getListDepartments = async ({
  pageNum = 0,
  limit,
  search,
  ...condition
}) => {
  limit = parseInt(limit, 10);
  const match = parseCondition({ ...condition });

  if (search) {
    const searchRegex = new RegExp(search, 'gi');
    match.code = searchRegex;
  }

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = pageNum > 0 ? (pageNum - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const [queryResult] = await Department.aggregate([
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

const createDepartment = async (data) => {
  const department = await Department.create(data);
  return department;
};

const findDepartment = async (condition) => {
  const department = await findDocument(Department, condition);
  return department;
};

const updateDepartment = async (id, data) => {
  const department = await Department.findByIdAndUpdate(id, data, {
    new: true,
  });
  return department;
};

const deleteDepartment = async (id) => {
  await Department.findByIdAndDelete(id);
};

module.exports = {
  getListDepartments,
  createDepartment,
  findDepartment,
  updateDepartment,
  deleteDepartment,
};
