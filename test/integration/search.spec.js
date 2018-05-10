const integrationSpecHelper = require('./support/integrationSpecHelper');
const { searchPage, googleTagManagerHelper, routes } = integrationSpecHelper;
const esResourcesMock = integrationSpecHelper.esResourcesMock;
const resourceModel = integrationSpecHelper.resourceModel;
const expect = require('chai').expect;
const { describe, it, before, after } = require('mocha');
const url = require('url');

const visitPageWithMockedResources = resources => {
  esResourcesMock.mockEsSearch(resources);
  return searchPage.visit();
};

const isWhitespace = s => s.replace(/\s/g, '').length === 0;

describe('Search', () => {
  before(() => visitPageWithMockedResources(resourceModel.getRawData()));
  after(() => esResourcesMock.restore());

  describe('Layout', () => {
    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller')
    );

    it('should display page', () =>
      expect(searchPage.header()).to.equal('Find online resources')
    );

    describe('list', () => {
      before(() => {
        this.resourceList = searchPage.getResults();
      });

      it('should display all resources', () =>
        expect(this.resourceList.length).to.eql(resourceModel.getRawData().length)
      );

      it('should display correct title for all resources', () =>
        expect(this.resourceList.map(i => i.title)).to
          .eql(resourceModel.getRawData().map(i => i.title))
      );
      it('should display correct summary for all resources', () =>
        expect(this.resourceList.map(i => i.summary)).to
          .eql(resourceModel.getRawData().map(i => i.summary))
      );
      it('should have correct path for all resources details page with result number', () =>
        expect(this.resourceList.map(i => i.href)).to.eql(
          resourceModel.getRawData()
            .map((i, idx) => routes.detailsUrl(i.resourceId, '', idx + 1, (idx + 1).toFixed(2)))
        )
      );
    });

    describe('breadcrumb', () => {
      it('should show breadcrumb on the search page', () => {
        expect(searchPage.getBreadcrumbs()).to.eql(['Home', 'Results']);
      });
    });
  });

  describe('search', () => {
    beforeEach(() => esResourcesMock.mockEsSearch(resourceModel.getRawData()));
    it('displays no results', () =>
      searchPage.search(esResourcesMock.constructMockQuery({ keyword: 'invalid term', hits: 0 }))
        .then(() => expect(searchPage.getResults().length).to.eql(0))
    );
    it('displays result found for keyword with correct title, summary, link, and score', () => {
      const hits = 1;
      const searchQuery = esResourcesMock.constructMockQuery({
        keyword: 'cooltext',
        hits,
      });
      esResourcesMock.mockEsSearch(esResourcesMock.mockedResources(hits));
      return searchPage.search(searchQuery)
        .then(() => {
          const expectedResource = resourceModel.getRawData()[0];
          const searchResults = searchPage.getResults();
          expect(searchResults.length).to.eql(hits);
          const { pathname, query } = url.parse(searchResults[0].href);
          const expectedUri = url.parse(
            routes.detailsUrl(expectedResource.resourceId, searchQuery, 1, '1.00'));
          expect(pathname).to.eql(expectedUri.pathname);
          expect(query).to.eql(expectedUri.query);
          expect(searchResults[0].resourceId).to.eql(expectedResource.resourceId);
          expect(searchResults[0].summary).to.eql(expectedResource.summary);
          expect(searchResults[0].title).to.eql(expectedResource.title);
          expect(searchResults[0].score).to.eql('score: 1.00');
        });
    });
    describe('search summary', () => {
      [
        {
          name: 'empty result',
          keyword: 'nothing to see here',
          hits: 0,
          summary: '0 results found containing',
        },
        {
          name: 'single result',
          keyword: 'Me likey a resourcey',
          hits: 1,
          summary: '1 result found containing',
        },
        {
          name: 'multiple results without keyword',
          keyword: '    ',
          hits: resourceModel.getRawData().length,
          summary: `${resourceModel.getRawData().length} results found`,
        },
        {
          name: 'multiple results with keyword',
          keyword: 'Me lovey two resourcey',
          hits: 2,
          summary: '2 results found containing',
        },
      ].forEach(s =>
          it(`for ${s.name} displays: "${s.summary}"`, () => {
            const mockQry = esResourcesMock.constructMockQuery(s);
            const expectedSummary = isWhitespace(mockQry) ? s.summary : `${s.summary} ${mockQry}`;
            return searchPage.search(mockQry)
              .then(() => expect(searchPage.getSearchSummary()).to.eql(expectedSummary));
          })
        );
    }
    );

    it('should show empty results message when 0 search results', () =>
      searchPage.search(esResourcesMock.constructMockQuery({ hits: 0 }))
        .then(() => expect(searchPage.isEmptyResultsMessageDisplayed()).to.eql(true))
    );

    it('should not show empty results message when results found', () =>
      searchPage.search(esResourcesMock.constructMockQuery({ hits: 10 }))
        .then(() => expect(searchPage.isEmptyResultsMessageDisplayed()).to.eql(false))
    );
  });
});

