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

  getCategories() {
    return this.browser.queryAll('[data-test="category"]').map(context => ({
      title: this.extractText('category-title', context),
      summary: this.extractText('category-summary', context),
    }));
  }
}
module.exports = DashboardPage;
