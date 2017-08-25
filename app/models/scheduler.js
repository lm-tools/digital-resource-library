const moment = require('moment');
module.exports = ({ schedule }) => {
  const get = (date) => schedule.find(it => moment(date).isBetween(it.start, it.end));
  return { get };
};
