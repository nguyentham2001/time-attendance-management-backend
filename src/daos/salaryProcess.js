const SalaryProcess = require('../models/salaryProcess');
const User = require('../models/user');
const Position = require('../models/position');
const Department = require('../models/department');
const { pagination } = require('../utils/pagination');
const { parseCondition, findDocument } = require('./daoUtil');

const getListSalaryProcess = async ({ pageNum = 0, limit, ...condition }) => {
  limit = parseInt(limit, 10);
  const match = parseCondition({ ...condition });

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
          positionId: '$userData.positionId',
          departmentId: '$userData.departmentId',
        },
      },
    },
    {
      $project: {
        userData: 0,
      },
    },
  ];

  const lookupPosition = [
    {
      $lookup: {
        from: Position.collection.name,
        localField: 'user.positionId',
        foreignField: '_id',
        as: 'positionData',
      },
    },
    {
      $unwind: { path: '$positionData', preserveNullAndEmptyArrays: true },
    },
    {
      $addFields: {
        position: {
          positionId: '$positionData._id',
          name: '$positionData.name',
        },
      },
    },
    {
      $project: {
        positionData: 0,
        'user.positionId': 0,
      },
    },
  ];

  const lookupDepartment = [
    {
      $lookup: {
        from: Department.collection.name,
        localField: 'user.departmentId',
        foreignField: '_id',
        as: 'departmentData',
      },
    },
    {
      $unwind: { path: '$departmentData', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        departmentId: 0,
        'user.departmentId': 0,
      },
    },
    {
      $addFields: {
        department: {
          departmentId: '$departmentData._id',
          name: '$departmentData.name',
        },
      },
    },
    {
      $project: {
        departmentData: 0,
      },
    },
  ];

  const [queryResult] = await SalaryProcess.aggregate([
    {
      $match: match,
    },
    ...lookupUser,
    ...lookupPosition,
    ...lookupDepartment,
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

const createSalaryProcess = async (data) => {
  const salary = await SalaryProcess.create(data);
  return salary;
};

const findSalaryProcess = async (condition) => {
  const salary = await findDocument(SalaryProcess, condition);
  return salary;
};

const updateSalaryProcess = async (id, data) => {
  const salary = await SalaryProcess.findByIdAndUpdate(id, data, {
    new: true,
  });
  return salary;
};

const updateManySalaryProcess = async (condition, updateData) => {
  await SalaryProcess.updateMany(condition, { $set: updateData });
};

const deleteSalaryProcess = async (id) => {
  await SalaryProcess.findByIdAndDelete(id);
};

module.exports = {
  getListSalaryProcess,
  createSalaryProcess,
  findSalaryProcess,
  updateSalaryProcess,
  deleteSalaryProcess,
  updateManySalaryProcess,
};
