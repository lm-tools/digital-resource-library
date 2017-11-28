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

const aMonday = moment().startOf('isoWeek').toDate();
const sampleRotation = {
  resources: [
    'featured01',
    'featured02',
    'featured03',
  ],
  startRotation: aMonday,
};
const scheduler = require('../../app/models/scheduler')(
  { schedule: sampleSchedule, rotation: sampleRotation });

describe('scheduler', () => {
  describe('getSchedule', () => {
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
        expect(scheduler.getSchedule(s.date)).to.eql(s.result)
      );
    });
  });

  describe('getRotation', () => {
    [
      {
        name: 'should return rotation when exists',
        date: aMonday,
        result: sampleRotation.resources[0],
      },
      {
        name: 'should return 2nd resource on next day of rotation',
        date: moment(aMonday).add(1, 'day').toDate(),
        result: sampleRotation.resources[1],
      },
      {
        name: 'should rotate through resources',
        date: moment(aMonday).add(4, 'days').toDate(),
        result: sampleRotation.resources[1],
      },
      {
        name: 'should show next monday resource on saturday',
        date: moment(aMonday).add(5, 'days').toDate(),
        result: sampleRotation.resources[2],
      },
      {
        name: 'should show next monday resource on sunday',
        date: moment(aMonday).add(13, 'days').toDate(),
        result: sampleRotation.resources[1],
      },
    ].forEach(s => {
      it(s.name, () =>
        expect(scheduler.getRotation(s.date)).to.eql(s.result)
      );
    });
  });
});
