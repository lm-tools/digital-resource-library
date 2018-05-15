const { before, after } = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const SearchService = require('./../../app/services/search-service');
const rawData = require('./../../app/data/resources');
const EsResourcesMock = require('../common/mocks/es-resources-mock');

const searchService = new SearchService({
  rawData: rawData.map(r => Object.assign(r, { id: r.resourceId })),
  host: 'http://search-service.test',
  index: 'search-service-test-resources',
  esType: 'search-service-test-resources',
});

const esMock = new EsResourcesMock({ searchService, console });

describe('search service', () => {
  before(() => esMock.mockEsBulk());
  after(() => esMock.restore());
  it('should format and post results to elasticsearch', () =>
    searchService.bulkIndex()
      .then(r =>
        expect(r).to.eql({ errorCount: 0, successCount: rawData.length })
      )
  );
});
