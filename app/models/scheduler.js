const moment = require('moment');

function positiveModulus(n, m) {
  return ((n % m) + m) % m;
}

function toWorkingDay(date, defaultDay = 0) {
  const isoDay = positiveModulus(date.getDay() - 1, 7);
  return isoDay < 5 ? isoDay : defaultDay;
}

function businessDaysBetween(from, to) {
  const weeksBetween = (moment(to).diff(moment(from), 'weeks'));
  const startDayFinalWeek = toWorkingDay(from, 5);
  const endDayOfFinalWeek = toWorkingDay(to, 5);
  return weeksBetween * 5 + endDayOfFinalWeek - startDayFinalWeek;
}

module.exports = ({ schedule, rotation }) => {
  const getSchedule = date => schedule.find(it => moment(date).isBetween(it.start, it.end));
  const getRotation = date => {
    const businessDays = businessDaysBetween(rotation.startRotation, date);
    return rotation.resources[positiveModulus(businessDays, rotation.resources.length)];
  };

  return { getSchedule, getRotation };
};
