const expect = require('chai').expect;
const helper = require('./support/integrationSpecHelper');
const browser = helper.browser;

describe('Health Check', () => {
  it('should provide status if controller available', () =>
    browser.fetch('/health_check')
      .then((response) =>
        expect(response.status).to.equal(200)
      )
  );
});
