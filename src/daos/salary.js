const Salary = require('../models/salary');
const User = require('../models/user');
const Position = require('../models/position');
const Department = require('../models/department');
const { pagination } = require('../utils/pagination');
const { parseCondition, findDocument } = require('./daoUtil');

const getListSalaries = async ({ pageNum = 0, limit, ...condition }) => {
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

  const [queryResult] = await Salary.aggregate([
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

const createSalary = async (data) => {
  const salary = await Salary.create(data);
  return salary;
};

const findSalary = async (condition) => {
  const salary = await findDocument(Salary, condition);
  return salary;
};

const updateSalary = async (id, data) => {
  const salary = await Salary.findByIdAndUpdate(id, data, {
    new: true,
  });
  return salary;
};

const updateManySalary = async (condition, updateData) => {
  await Salary.updateMany(condition, { $set: updateData });
};

const deleteSalary = async (id) => {
  await Salary.findByIdAndDelete(id);
};

module.exports = {
  getListSalaries,
  createSalary,
  findSalary,
  updateSalary,
  deleteSalary,
  updateManySalary,
};
