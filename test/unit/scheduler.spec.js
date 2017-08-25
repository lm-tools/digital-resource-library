const { describe, it } = require('mocha');
const { expect } = require('chai');
const moment = require('moment');
const sampleSchedule = [
  { start: moment().subtract(1, 'day'), end: moment().add(1, 'day'), resource: 'featured01' },
  { start: moment().subtract(2, 'days'), end: moment().subtract(1, 'day'), resource: 'featured02' },
  {
    start: moment('2013-02-08T09:30+01'),
    end: moment('2013-02-08T10:30+01'),
    resource: 'featured03',
  },
];
const scheduler = require('../../app/models/scheduler')({ schedule: sampleSchedule });

describe('scheduler', () => {
  [
    {
      name: 'should return schedule when exists',
      date: new Date(),
      result: sampleSchedule[0],
    },
    {
      name: 'should return undefined when not exists',
      date: moment().add('100', 'years').toDate(),
      result: undefined,
    },
    {
      name: 'should check time',
      date: moment('2013-02-08T10:29+01').toDate(),
      result: sampleSchedule[2],
    },
  ].forEach(s => {
    it(s.name, () =>
      expect(scheduler.get(s.date)).to.eql(s.result)
    );
  });
});
