const moment = require('moment');

const schedule = [
  {
    start: moment('2017-09-01T13:00+01'),
    end: moment('2017-09-04T12:59:59+01'),
    resource: 'featured02',
  }, {
    start: moment('2017-09-04T13:00+01'),
    end: moment('2017-09-05T12:59:59+01'),
    resource: 'featured03',
  },
  {
    start: moment('2017-09-05T13:00+01'),
    end: moment('2017-09-06T12:59:59+01'),
    resource: 'featured04',
  },
  {
    start: moment('2017-09-06T13:00+01'),
    end: moment('2017-09-07T12:59:59+01'),
    resource: 'featured05',
  },
  {
    start: moment('2017-09-08T13:00+01'),
    end: moment('2017-09-11T12:59:59+01'),
    resource: 'featured06',
  },
];

module.exports = schedule;
