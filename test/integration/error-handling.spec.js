const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const errorPage = helper.errorPage;
const expect = require('chai').expect;

describe('Error handling', () => {
  describe('not found', () => {
    before(() =>
      helper.browser.visit('/path-that-not-exists').catch(() => {})
    );

    it('returns 404 code', () =>
      expect(helper.browser.response.status).to.equal(404)
    );

    it('has empty error details', () =>
      expect(errorPage.getErrorDetails()).to.equal('')
    );
    it('displays "Page not found" message', () =>
      expect(errorPage.getMessage()).to.equal(
        'There\'s nothing here. The page may have moved or been removed. ' +
        'Search again to find more resources.')
    );

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getUserVariable()).to.exists
    );
  });
  describe('500', () => {
    describe('test and development', () => {
      before(() =>
        errorPage.visit(500).catch(() => {})
      );
      it('should show error message', () =>
        expect(errorPage.getErrorDetails()).to.contain('Test error 500 Error: Test error at ')
      );
      it('displays generic message', () =>
        expect(errorPage.getMessage()).to.equal('We\'re experiencing technical problems.')
      );
    });
    describe('production', () => {
      const env = helper.app.get('env');
      before(() => {
        helper.app.set('env', 'production');
        return errorPage.visit(500).catch(() => {});
      });
      it('should not show error message', () =>
        expect(errorPage.getErrorDetails()).to.equal('')
      );
      it('displays generic message', () =>
        expect(errorPage.getMessage()).to.equal('We\'re experiencing technical problems.')
      );
      after(() => helper.app.set('env', env));
    });
  });
});
