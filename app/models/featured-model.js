module.exports = function ({ scheduler, data }) {
  const getScheduled = date => {
    const schedule = scheduler.getSchedule(date);
    return schedule ? data[schedule.resource] : data.featured01;
  };
  const getRotation = date => {
    const rotation = scheduler.getRotation(date);
    return rotation ? data[rotation] : data.featured01;
  };
  const get = () => data.featured05;
  return { get, getScheduled, getRotation };
};
