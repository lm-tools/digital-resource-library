class DetailPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit(id) {
    return this.browser.visit(`/resources/${id}`);
  }

  text(dataTestAttrVal) {
    return this.browser.text(`[data-test="${dataTestAttrVal}"]`);
  }

  category() {
    return this.text('category');
  }

  header() {
    return this.text('header');
  }

  summary() {
    return this.text('summary');
  }

  journalMessage() {
    return this.text('journal-message');
  }

  link() {
    return this.browser.query('[data-test="link"]').href;
  }

  linkText() {
    return this.text('link');
  }

}
module.exports = DetailPage;
