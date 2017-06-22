const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const findPage = helper.findPage;
const expect = require('chai').expect;

describe('Find', () => {
  it('should contain valid google tag manager data', () =>
    findPage.visit()
      .then(() => expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller'))
  );

  it('should display page', () =>
    findPage.visit()
      .then(() => expect(findPage.header()).to.equal('Explore the resource library'))
  );
});

