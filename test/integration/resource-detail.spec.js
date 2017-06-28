const { resourceDetailPage } = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it, before } = require('mocha');

describe('ResourceDetail', () => {
  describe('DirectNavigation', () => {
    before(() => resourceDetailPage.visitById('octo001'));

    it('should display page', () => expect(resourceDetailPage.header()).to
      .equal('Steps Ahead mentoring'));
  });
});
