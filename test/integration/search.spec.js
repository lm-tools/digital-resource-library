const { searchPage, googleTagManagerHelper } = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it, before } = require('mocha');
const resourcesListModel = require('../../app/data/resources');

describe('Search', () => {
  before(() => searchPage.visit());

  it('should contain valid google tag manager data', () =>
    expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller')
  );

  it('should display page', () =>
    expect(searchPage.header()).to.equal('Explore the resource library')
  );

  describe('list', () => {
    before(() => {
      this.resourceList = searchPage.getResources();
    });

    it('should display all resources', () =>
      expect(this.resourceList.length).to.eql(resourcesListModel.length)
    );

    it('should display correct title for all resources', () =>
      expect(this.resourceList.map(i => i.title)).to.eql(resourcesListModel.map(i => i.title))
    );
    it('should display correct summary for all resources', () =>
      expect(this.resourceList.map(i => i.summary)).to.eql(resourcesListModel.map(i => i.summary))
    );
    it('should display correct categories for all resources', () =>
      expect(this.resourceList.map(i => i.categories))
        .to.eql(resourcesListModel.map(i => i.category))
    );
    it('should have correct path for all resources details page', () =>
      expect(this.resourceList.map(i => i.pathname))
        .to.eql(resourcesListModel.map(i => `/resources/${i.resourceId}/detail`))
    );
  });
});

