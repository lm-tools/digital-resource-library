const {
  dashboardPage,
  googleTagManagerHelper,
  browser,
  routes,
} = require('./support/integrationSpecHelper');
const expect = require('chai').expect;
const { describe, it } = require('mocha');
const categoryListModel = require('../../app/data/categories');

describe('Dashboard', () => {
  before(() => dashboardPage.visit());
  before(() => {
    this.categoryList = dashboardPage.getCategories();
    this.searchableCategory = categoryListModel.find((i) => !!i.title).title;
  });
  it('should contain valid google tag manager data', () =>
    expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller')
  );

  it('should display page', () =>
    expect(dashboardPage.header()).to.equal('Explore the resource library')
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
      dashboardPage.search(this.searchableCategory)
        .then(() => expect(browser.location.href)
          .to.equal(routes.searchUrlAbsolute(this.searchableCategory)))
    );
  });

  describe('breadcrumb', () => {
    before(() => dashboardPage.visit());

    it('should not show breadcrumb on the homepage', () =>
      expect(dashboardPage.getBreadcrumbs()).to.eql([])
    );
  });

  it('should have a valid resource as the featured resource', () =>
    dashboardPage.clickFeaturedResourceLink().then(() => expect(browser.statusCode).to.equal(200))
  );
});
