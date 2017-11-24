const Page = require('./page');
class ErrorPage extends Page {
  visit(id) {
    return this.browser.visit(this.routes.errorUrl(id));
  }

  getMessage() {
    return this.browser.text('[data-test="message"]');
  }

  getErrorDetails() {
    return this.browser.text('[data-test="error-details"]');
  }
}

module.exports = ErrorPage;
