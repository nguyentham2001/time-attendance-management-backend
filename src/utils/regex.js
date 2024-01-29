const TIME_REGEX = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
const MONTH_REGEX = new RegExp(/^[\d]{2}\/[\d]{4}$/);

module.exports = {
  TIME_REGEX,
  MONTH_REGEX,
};
