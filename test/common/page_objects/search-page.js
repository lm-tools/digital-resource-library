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

  clickOnResourse(resourceId) {
    return this.browser.click(`[data-test="resource-${resourceId}"]`);
  }

  getResults() {
    const resources = this.browser.queryAll('[data-test="resource"]');
    return resources.map(context => ({
      title: this.extractText('title', context),
      summary: this.extractText('summary', context),
      categories: this.browser.queryAll('[data-test="category"]', context)
        .map(categoryContext => Object({
          text: this.browser.text(categoryContext),
          link: (() => {
            const categoryLink = this.browser.query('[data-test="category-link"]', categoryContext);
            return `${categoryLink.pathname}${categoryLink.search}`;
          })(),
        })
      ),
      pathname: this.browser.query('[data-test^="resource-"]', context).pathname,
    }));
  }

  getSearchSummary() {
    return this.browser.text('[data-test="search-summary"]');
  }

  search(keyword) {
    this.browser.fill('[data-test="search-input"]', keyword);
    return this.browser.click('[data-test="search-button"]');
  }
}
module.exports = SearchPage;
