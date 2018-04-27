const esEndpoint = 'https://search-drl-test.com';
const appPort = '9876';
process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
process.env.PORT = appPort;
process.env.ES_ENDPOINT = esEndpoint;
process.env.ES_INDEX = 'test-drl-resources';

const Zombie = require('zombie');
const basePath = process.env.EXPRESS_BASE_PATH || '';
Zombie.site = `http://localhost:${appPort}`;
const browser = new Zombie();
const screenshots = require('./screenshots');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const DashboardPage = require('../../common/page_objects/dashboard-page');
const SearchPage = require('../../common/page_objects/search-page');
const ErrorPage = require('../../common/page_objects/error-page');
const CookiePage = require('../../common/page_objects/cookie-page');
const DetailPage = require('../../common/page_objects/detail-page');
const EntrypointPage = require('../../common/page_objects/entrypoint-page');
const routes = require('./routes')({ basePath, siteUrl: Zombie.site });
const { resourceModel, searchService, logger } = require('./../../../app/appContext');
const EsResourcesMock = require('../../common/mocks/es-resources-mock');

const app = require('../../../bin/www');

/* eslint-disable no-console */
console.log(`Integration tests against ${Zombie.site}${basePath}`);

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = {
  browser,
  routes,
  basePath,
  googleTagManagerHelper: new GoogleTagManagerHelper(browser),
  dashboardPage: new DashboardPage({ browser, routes }),
  searchPage: new SearchPage({ browser, routes }),
  errorPage: new ErrorPage({ browser }),
  cookiePage: new CookiePage({ browser, routes }),
  detailPage: new DetailPage({ browser, routes }),
  entrypointPage: new EntrypointPage({ browser, routes }),
  app,
  resourceModel,
  esResourcesMock: new EsResourcesMock({ searchService, logger }),
};
