const {
  googleTagManagerHelper,
  detailPage,
  searchPage,
  routes } = require('./support/integrationSpecHelper');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;
const { describe, it, before } = require('mocha');
const sampleResource = require('../../app/data/resources').find(i => i.category.length > 1);

describe('Detail', () => {
  describe('DirectNavigation', () => {
    before(() => detailPage.visit(sampleResource.resourceId));

    it('should display page', () => expect(detailPage.header()).to
      .equal('Steps Ahead mentoring'));
    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller')
    );

    it('should display first category', () =>
      expect(detailPage.categoryText()).to.equal(sampleResource.category[0]));

    it('should link first category to search page', () =>
      expect(detailPage.categoryLink())
        .to.equal(routes.searchUrl(sampleResource.category[0])));

    it('should display title', () =>
      expect(detailPage.header()).to.equal(sampleResource.title)
    );

    it('should display summary', () =>
      expect(detailPage.summary()).to.equal(sampleResource.summary)
    );

    it('should display journal message', () =>
      expect(detailPage.journalMessage()).to.equalIgnoreSpaces(sampleResource.journalMessage)
    );

    it('should contain journal message as the copy to clipboard text', () =>
      expect(detailPage.copyClipboardJournalContent()).to.equal(sampleResource.journalMessage)
    );

    it('should display link', () =>
      expect(detailPage.link().href).to.equal(sampleResource.url)
    );

    it('should display link text', () =>
      expect(detailPage.link().text).to.equal('Go to resource')
    );

    it('should show all related categories', () =>
      expect(detailPage.getCategories()).to.eql(sampleResource.category.map(c => ({
        href: routes.searchUrl(c),
        text: c,
      })))
    );

    it('should show alert and message copied text when copy message link is clicked', () =>
      detailPage.copyClipboard().then(() => {
        expect(detailPage.isMessageCopiedTextDisplayed()).to.equal(true);
        expect(detailPage.isMessageCopiedAlertBoxDisplayed()).to.equal(true);
      })
    );

    it('should keep alert and remove message copied text when copy message is clicked twice', () =>
      detailPage.visit(sampleResource.resourceId)
        .then(() => detailPage.copyClipboard())
        .then(() => detailPage.copyClipboard())
        .then(() => {
          expect(detailPage.isMessageCopiedTextDisplayed()).to.equal(false);
          expect(detailPage.isMessageCopiedAlertBoxDisplayed()).to.equal(true);
        })
    );
  });

  it('should link from search page', () =>
    searchPage.visit()
      .then(() => searchPage.clickOnResourse(sampleResource.resourceId))
      .then(() => expect(detailPage.header()).to.eql(sampleResource.title))
  );

  describe('breadcrumb', () => {
    before(() => detailPage.visit(sampleResource.resourceId));

    it('should show breadcrumb on the details page', () => {
      expect(detailPage.getBreadcrumbs()).to.eql(['Home', 'Results', sampleResource.title]);
    });
  });
});
