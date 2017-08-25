module.exports = function ({ scheduler, data }) {
  const get = (date) => {
    const schedule = scheduler.get(date);
    return schedule ? data[schedule.resource] : data.featured01;
  };
  return { get };
};
