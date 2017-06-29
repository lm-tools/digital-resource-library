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

  categoryText() {
    return this.text('category');
  }

  categoryLink() {
    const catEl = this.browser.query('[data-test="category"]');
    return `${catEl.pathname}${catEl.search}`;
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
