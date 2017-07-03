class Page {

  constructor({ browser, routes }) {
    this.browser = browser;
    this.routes = routes;
  }

  /**
   * @param {string} dataTest - the data test element
   * @param {object} context - the core object returned from browser.querySelector. By default
   * uses the document
   * returns the text within the element
   */
  extractText(dataTest, context = this.browser) {
    return this.browser.text(`[data-test="${dataTest}"]`, context);
  }


  /**
   * @param {string} dataTest - the data test element
   * @param {object} context - the 'core' object returned from browser.querySelector. By default
   * uses the document
   * returns the text within the element
   */
  extractLink(dataTest, context = this.browser) {
    const href = this.browser.query(`[data-test="${dataTest}"]`, context).getAttribute('href');
    const text = this.extractText(dataTest, context);
    return { href, text };
  }

}
module.exports = Page;
