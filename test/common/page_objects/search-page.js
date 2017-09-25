const Page = require('./page');

class SearchPage extends Page {

  visit() {
    return this.browser.visit(this.routes.searchUrl());
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

  clickOnResourse(resourceId) {
    return this.browser.click(`[data-test="resource-${resourceId}"]`);
  }

  getResults() {
    const resources = this.browser.queryAll('[data-test="resource"]');
    return resources.map(resourceContext => ({
      title: this.extractText('title', resourceContext),
      summary: this.extractText('summary', resourceContext),
      href: this.browser.query('[data-test^="resource-"]', resourceContext).getAttribute('href'),
    }));
  }

  getSearchSummary() {
    return this.browser.text('[data-test="search-summary"]');
  }

  search(keyword) {
    this.browser.fill('[data-test="search-input"]', keyword);
    return this.browser.click('[data-test="search-button"]');
  }

  isEmptyResultsMessageDisplayed() {
    return this.browser.query('[data-test="search-message"]') != null;
  }
}
module.exports = SearchPage;
