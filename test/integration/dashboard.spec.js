const {
  dashboardPage,
  googleTagManagerHelper,
  browser,
  routes,
  esResourcesMock,
  resourceModel,
} = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it, before, beforeEach, after } = require('mocha');
const categoryListModel = require('../../app/data/categories');

describe('Dashboard', () => {
  before(() => esResourcesMock.mockEsSearch(resourceModel.getRawData()));
  beforeEach(() => dashboardPage.visit());
  beforeEach(() => {
    this.categoryList = dashboardPage.getCategories();
    this.searchableCategory = categoryListModel.find((i) => !!i.title).title;
  });
  after(() => esResourcesMock.restore());

  it('should contain valid google tag manager data', () =>
    expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller')
  );

  it('should display page', () =>
    expect(dashboardPage.header()).to.equal('Find online resources')
  );

  describe('category list', () => {
    it('should display all categories', () =>
      expect(this.categoryList.length).to.eql(categoryListModel.length)
    );

    it('should display correct title for all categories', () =>
      expect(this.categoryList.map(i => i.title)).to.eql(categoryListModel.map(i => i.title))
    );
    it('should display correct summary for all categories', () =>
      expect(this.categoryList.map(i => i.summary)).to.eql(categoryListModel.map(i => i.summary))
    );

    it('should have correct relative link for all categories', () =>
      expect(this.categoryList.map(i => i.relativeLink))
        .to.eql(categoryListModel.map(i => routes.searchUrl(i.title)))
    );

    it('should link to search page with correct category searched', () =>
      dashboardPage.search(esResourcesMock.constructMockQuery({
        keyword: this.searchableCategory,
        hits: 2,
      }))
        .then(() => expect(browser.location.href)
          .to.equal(`${routes.searchUrlAbsolute(this.searchableCategory)}%20(2)`))
    );
  });

  describe('breadcrumb', () => {
    before(() => dashboardPage.visit());

    it('should not show breadcrumb on the homepage', () =>
      expect(dashboardPage.getBreadcrumbs()).to.eql([])
    );
  });
});
