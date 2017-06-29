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
      this.resourceList = searchPage.getResults();
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
      expect(this.resourceList.map(i => i.categories.map(j => j.text)))
        .to.eql(resourcesListModel.map(i => i.category))
    );
    it('should contain correct link to all categories for all resources', () =>
      expect(this.resourceList.map(i => i.categories.map(j => j.link)))
        .to.eql(resourcesListModel.map(i => i.category.map(j => encodeURI(`/search?search=${j}`))))
    );
    it('should have correct path for all resources details page', () =>
      expect(this.resourceList.map(i => i.pathname))
        .to.eql(resourcesListModel.map(i => `/resources/${i.resourceId}`))
    );
  });

  describe('search', () => {
    [
      {
        name: 'returns 0 result for incorrect keyword',
        keyword: 'incorrect-keyword',
        resultsLength: 0,
        summary: '0 results found',
      },
      {
        name: 'displays results found for keyword',
        keyword: 'https://do-it.org',
        resultsLength: 1,
        summary: '1 result found containing https://do-it.org',
      },
    ].forEach(s => {
      it(s.name, () =>
        searchPage.search(s.keyword)
          .then(() => expect(searchPage.getResults().length).to.eql(s.resultsLength))
      );
    });

    [
      {
        name: 'empty result',
        keyword: 'incorrect-keyword',
        summary: '0 results found containing incorrect-keyword',
      },
      {
        name: 'single result',
        keyword: 'https://do-it.org',
        summary: '1 result found containing https://do-it.org',
      },
      {
        name: 'multiple results without keyword',
        keyword: '    ',
        summary: `${resourcesListModel.length} results found`,
      },
      {
        name: 'multiple results with keyword',
        keyword: 'a',
        summary: `${resourcesListModel.length} results found containing a`,
      },
    ].forEach(s => {
      it(`for ${s.name} displays: "${s.summary}"`, () =>
        searchPage.search(s.keyword)
          .then(() => expect(searchPage.getSearchSummary()).to.eql(s.summary))
      );
    });
  });
});

