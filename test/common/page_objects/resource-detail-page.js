class DetailPage {
  constructor(browser) {
    this.browser = browser;
  }

  pageLoaded() {
    this.browser.query('[data-test="header"]');
  }

  visit(id) {
    return this.browser.visit(`/resources/${id}`);
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

}
module.exports = DetailPage;
