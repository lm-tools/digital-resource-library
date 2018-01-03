const versionedAssets = require('../../dist/public/rev-manifest.json');

const featuredModel = (data) => Object.assign({}, data,
  {
    imageSmall: versionedAssets[`images/screens/${data.resourceId}-small.png`],
  }
);

module.exports = function ({ scheduler, data }) {
  const getScheduled = date => {
    const schedule = scheduler.getSchedule(date);
    return schedule ? featuredModel(data[schedule.resource]) : featuredModel(data.featured01);
  };
  const getRotation = date => {
    const rotation = scheduler.getRotation(date);
    return rotation ? featuredModel(data[rotation]) : featuredModel(data.featured01);
  };
  const get = () => featuredModel(data.featured05);
  return { get, getScheduled, getRotation };
};
