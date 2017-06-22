class FindPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit() {
    return this.browser.visit('/');
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }
}
module.exports = FindPage;
