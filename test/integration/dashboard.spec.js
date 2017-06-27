const { dashboardPage, googleTagManagerHelper } = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it } = require('mocha');

describe('Dashboard', () => {
  it('should contain valid google tag manager data', () =>
    dashboardPage.visit()
      .then(() => expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller'))
  );

  it('should display page', () =>
    dashboardPage.visit()
      .then(() => expect(dashboardPage.header()).to.equal('Explore the resource library'))
  );
});

