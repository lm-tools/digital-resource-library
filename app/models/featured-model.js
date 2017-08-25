module.exports = function ({ scheduler, data }) {
  const getScheduled = (date) => {
    const schedule = scheduler.get(date);
    return schedule ? data[schedule.resource] : data.featured01;
  };
  const get = () => data.featured05;
  return { get, getScheduled };
};
