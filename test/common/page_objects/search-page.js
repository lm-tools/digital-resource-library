const Page = require('./page');

class SearchPage extends Page {

  visit() {
    return this.browser.visit(this.routes.searchUrl());
  }

  header() {
    return this.browser.text('[data-test="header"]');
  }

  clickOnResourse(resourceId) {
    return this.browser.click(`[data-test="resource-link-${resourceId}"]`);
  }

  /**
   * @param {object} resourceContext - the context object for the resource
   * returns a list of categories as an object: { text, href }.
   */
  getCategories() {
    return this.browser.queryAll('[data-test="category-link"]')
      .map(categoryContext => this.extractLink('link', categoryContext));
  }

  getResults() {
    const resources = this.browser.queryAll('[data-test^="resource-id-"]');
    return resources.map(resourceContext => ({
      title: this.extractText('title', resourceContext),
      summary: this.extractText('summary', resourceContext),
      href: this.browser.query('[data-test^="resource-link-"]', resourceContext)
        .getAttribute('href'),
      resourceId: resourceContext.getAttribute('data-test').replace('resource-id-', ''),
      score: this.extractText('score', resourceContext),
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
