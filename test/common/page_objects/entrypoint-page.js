const Page = require('./page');

class EntrypointPage extends Page {

  visit() {
    return this.browser.visit(this.routes.entrypointUrl());
  }

  clickHeaderBannerLink() {
    return this.browser.click('[data-test="homepage-link"]');
  }

}
module.exports = EntrypointPage;
