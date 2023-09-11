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
    default:
      return null;
  }
};

module.exports = getErrorMessage;
