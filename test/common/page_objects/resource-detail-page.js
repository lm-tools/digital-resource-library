class ResourceDetailPage {
  constructor(browser) {
    this.browser = browser;
  }

  pageLoaded() {
    this.browser.query('[data-test="header"]');
  }

  visitById(id) {
    return this.browser.visit(`/resources/${id}/detail`);
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

}
module.exports = ResourceDetailPage;
