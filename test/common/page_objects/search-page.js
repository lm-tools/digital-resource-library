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

  /**
   * @param {object} resourceContext - the context object for the resource
   * returns a list of categories as an object: { text, href }.
   */
  getCategories(resourceContext) {
    return this.browser.queryAll('[data-test="category"]', resourceContext)
      .map(categoryContext => this.extractLink('category-link', categoryContext));
  }

  getResults() {
    const resources = this.browser.queryAll('[data-test="resource"]');
    return resources.map(resourceContext => ({
      title: this.extractText('title', resourceContext),
      summary: this.extractText('summary', resourceContext),
      categories: this.getCategories(resourceContext),
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
}
module.exports = SearchPage;
