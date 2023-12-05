const moment = require('moment');

const splitDate = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return { year, month, day };
};

const diffTime = (fromTime, toTime, unitOfTime = 'second') => {
  return moment(toTime).diff(moment(fromTime), unitOfTime);
};

const minDate = (dates) => {
  const moments = dates.filter((date) => date).map((date) => moment(date));
  return moment.min(moments);
};

const maxDate = (dates) => {
  const moments = dates.filter((date) => date).map((date) => moment(date));
  return moment.max(moments);
};

module.exports = {
  splitDate,
  diffTime,
  minDate,
  maxDate,
};
