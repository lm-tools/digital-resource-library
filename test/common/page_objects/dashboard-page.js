class DashboardPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit() {
    return this.browser.visit('/');
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

  extractText(name, context) {
    return this.browser.text(`[data-test="${name}"]`, context);
  }

  extractRelativeLink(name, context) {
    const linkEl = this.browser.query(`[data-test="${name}"]`, context);
    return `${linkEl.pathname}${linkEl.search}`;
  }

  getCategories() {
    return this.browser.queryAll('[data-test="category"]').map(context => ({
      title: this.extractText('category-link', context),
      summary: this.extractText('category-summary', context),
      relativeLink: this.extractRelativeLink('category-link', context),
    }));
  }
}
module.exports = DashboardPage;
