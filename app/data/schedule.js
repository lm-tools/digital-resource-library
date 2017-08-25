const moment = require('moment');

const schedule = [
  {
    start: moment('2017-08-24T13:00+01'),
    end: moment('2017-08-25T12:59:59+01'),
    resource: 'featured03',
  }, {
    start: moment('2017-08-25T13:00+01'),
    end: moment('2017-08-29T12:59:59+01'),
    resource: 'featured05',
  },
  {
    start: moment('2017-08-29T13:00+01'),
    end: moment('2017-08-30T12:59:59+01'),
    resource: 'featured06',
  },
];

module.exports = schedule;
