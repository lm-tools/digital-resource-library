class SearchPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit() {
    return this.browser.visit('/search');
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

  extractText(name, context) {
    return this.browser.text(`[data-test="${name}"]`, context);
  }

  getResources() {
    const resources = this.browser.queryAll('[data-test="resource"]');
    return resources.map(context => ({
      title: this.extractText('title', context),
      summary: this.extractText('summary', context),
      categories: this.browser.queryAll('[data-test="category"]', context)
        .map(i => this.browser.text(i)),
      pathname: this.browser.query('[data-test="search-result-link"]', context).pathname,
    }));
  }
}
module.exports = SearchPage;
