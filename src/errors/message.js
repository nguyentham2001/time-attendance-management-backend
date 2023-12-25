const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    case codes.USER_EXISTS:
      return 'User already exists';
    case codes.DEPARTMENT_NAME_EXIST:
      return 'Department already exists';
    case codes.DEPARTMENT_NOT_FOUND:
      return 'Department is not found';
    case codes.POSITION_NAME_EXIST:
      return 'Position already exists';
    case codes.POSITION_NOT_FOUND:
      return 'Position is not found';
    case codes.ABSENCE_NAME_EXIST:
      return 'Absence already exists';
    case codes.ABSENCE_NOT_FOUND:
      return 'Absence is not found';
    case codes.ABSENCE_REQUEST_NOT_FOUND:
      return 'Absence request is not found';
    case codes.ABSENCE_REQUEST_DAY_GREATER_MAX:
      return 'The total number of days off is greater than the maximum number of days off allowed for this type of leave';
    case codes.ABSENCE_REQUEST_DAY_CONFLICT:
      return 'Date conflicts with a previous request';
    case codes.ABSENCE_REQUEST_NOT_ALLOW_DELETE:
      return 'Absence request not allow delete';
    case codes.SALARY_NOT_FOUND:
      return 'Salary is not found';
    case codes.OVERTIME_NOT_FOUND:
      return 'Overtime is not found';
    case codes.OVERTIME_TIME_RANGE_INVALID:
      return 'startTime must be less than endTime';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
