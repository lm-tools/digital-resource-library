const moment = require('moment');

const schedule = [
  {
    start: moment('2017-08-24T12:00+01'),
    end: moment('2017-08-25T11:59:59+01'),
    resource: 'featured03'
  },{
    start: moment('2017-08-25T12:00+01'),
    end: moment('2017-08-29T11:59:59+01'),
    resource: 'featured05'
  },
  {
    start: moment('2017-08-29T12:00+01'),
    end: moment('2017-08-30T11:59:59+01'),
    resource: 'featured06'
  },
];

module.exports = schedule;
