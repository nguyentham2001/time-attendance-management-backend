const camelcaseKeys = require('camelcase-keys');

const camelCaseReq = (req, res, next) => {
  req.query = camelcaseKeys(req.query, { deep: true });
  req.body = camelcaseKeys(req.body, {
    deep: true,
    exclude: [
      'totalSalaryOT',
      'totalOTWorkDay',
      'totalONWorkDay',
      'totalOTWeekendDay',
      'totalONWeekendDay',
      'totalOTHoliday',
      'totalONHoliday',
    ],
  });
  next();
};

module.exports = camelCaseReq;
