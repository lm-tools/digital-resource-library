const helper = require('./support/integrationSpecHelper');
const browser = helper.browser;
const routes = helper.routes;
const expect = require('chai').expect;

const entrypointPage = helper.entrypointPage;
const { describe, it } = require('mocha');

describe('Entrypoint', () => {
  beforeEach(() => entrypointPage.visit());

  it('should show the dashboard as the entry point', () => {
    expect(browser.location.pathname).to.equal(routes.entrypointUrl());
    expect(browser.status).to.equal(200);
  });

  it('should link back to the entrypoint from header title link', () =>
    entrypointPage.clickHeaderBannerLink()
      .then(() => {
        expect(browser.location.pathname).to.equal(routes.entrypointUrl());
        expect(browser.status).to.equal(200);
      })
  );
});
