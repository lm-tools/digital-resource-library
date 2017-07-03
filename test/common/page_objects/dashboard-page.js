const Page = require('./page');

class DashboardPage extends Page {
  visit() {
    return this.browser.visit(this.routes.dashboardUrl());
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

  search(keyword) {
    this.browser.fill('[data-test="search-input"]', keyword);
    return this.browser.click('[data-test="search-button"]');
  }

  clickFeaturedResourceLink() {
    return this.browser.click('[data-test="featured-resource-link"]');
  }

}
module.exports = DashboardPage;
