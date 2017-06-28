const { detailPage } = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it, before } = require('mocha');

describe('ResourceDetail', () => {
  describe('DirectNavigation', () => {
    before(() => detailPage.visit('octo001'));

    it('should display page', () => expect(detailPage.header()).to
      .equal('Steps Ahead mentoring'));
  });
});
