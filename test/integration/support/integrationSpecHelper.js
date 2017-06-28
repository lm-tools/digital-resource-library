const Zombie = require('zombie');
const appPort = '9876';
Zombie.site = `http://localhost:${appPort}`;
const browser = new Zombie();
const screenshots = require('./screenshots');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const DashboardPage = require('../../common/page_objects/dashboard-page');
const SearchPage = require('../../common/page_objects/search-page');
const ErrorPage = require('../../common/page_objects/error-page');

process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
process.env.PORT = appPort;
const app = require('../../../bin/www');

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = {
  browser,
  googleTagManagerHelper: new GoogleTagManagerHelper(browser),
  dashboardPage: new DashboardPage(browser),
  searchPage: new SearchPage(browser),
  errorPage: new ErrorPage(browser),
  app,
};
