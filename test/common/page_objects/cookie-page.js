const Page = require('./page');

class CookiePage extends Page {

  visit() {
    return this.browser.visit(this.routes.cookieUrl());
  }

  isDisplayed() {
    return !! this.extractText('cookie-title');
  }

}
module.exports = CookiePage;
