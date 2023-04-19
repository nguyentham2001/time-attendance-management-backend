const {
  Types: { ObjectId },
} = require('mongoose');

const isValidObjectId = (id) => {
  if (!ObjectId.isValid(id)) return false;
  return String(new ObjectId(id)) === String(id);
};

const findDocument = async (Model, condition) => {
  let element = null;
  if (isValidObjectId(condition)) {
    element = await Model.findById(condition).lean();
  }

  if (condition && typeof condition === 'object') {
    element = await Model.findOne(condition).lean();
  }

  return element;
};

const parseCondition = (condition = {}) => {
  if (isValidObjectId(condition)) {
    return { _id: ObjectId(condition) };
  }
  if (condition && typeof condition === 'object') {
    Object.keys(condition).forEach((key) => {
      if (key === 'phoneNumber')
        condition[key] = new RegExp(condition[key], 'gi');
      else if (isValidObjectId(condition[key])) {
        condition[key] = ObjectId(condition[key]);
      } else if (typeof condition[key] === 'string') {
        if (condition[key] === 'null') {
          condition[key] = null;
        } else if (condition[key] === 'undefined') {
          condition[key] = undefined;
        } else {
          condition[key] = new RegExp(condition[key], 'gi');
        }
      }
    });
    return condition;
  }
  return condition;
};

const parseTimeRange = (startTime, endTime) => {
  return {
    $gte: startTime ? new Date(startTime) : new Date('01/01/2019'),
    $lte: endTime ? new Date(endTime) : Date.now(),
  };
};

module.exports = {
  findDocument,
  parseCondition,
  parseTimeRange,
};
