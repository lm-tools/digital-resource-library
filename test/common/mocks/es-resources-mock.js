const nock = require('nock');

class EsResourcesMock {
  constructor({ searchService, logger }) {
    this.searchService = searchService;
    this.logger = logger;
  }

  constructMockQuery({ keyword = 'default search term', hits }) {
    return keyword.replace(/\s/g, '').length === 0 ? keyword : `${keyword} (${hits})`;
  }

  destructureMockQuery(query) {
    const hitsRegexResult = (/\(([^)]+)\)/).exec(query);
    const hits = Array.isArray(hitsRegexResult) && hitsRegexResult[1];
    let result;
    if (hits && !isNaN(hits)) {
      const keyword = query.replace(`(${hits})`, '');
      result = { keyword, hits: Number(hits) };
    }
    return result;
  }

  mockEsSearch(mockResources) {
    // prevent concurrent test issues. See node-nock issue 278
    if (!nock.isActive()) {
      nock.activate();
    }
    return nock(this.searchService.host)
      .post(`/${this.searchService.index}/_search`)
      .reply(200, (url, body) => {
        // return all resources when matching all
        if (body && body.query && body.query.match_all) {
          return {
            hits: {
              max_score: 213,
              hits: mockResources.map((r, i) => ({
                _source: r,
                _score: i + 1,
              })),
              total: mockResources.length,
            },
          };
        } else if (body && body.query && body.query.multi_match) {
          // search query is a number, return that number of results from the mockResults
          const mockQuery = this.destructureMockQuery(body.query.multi_match.query);
          if (mockQuery) {
            return {
              hits: {
                max_score: 213,
                hits: mockResources.slice(0, mockQuery.hits).map((r, i) => ({
                  _source: r,
                  _score: i + 1,
                })),
                total: mockQuery.hits,
              },
            };
          }
        }
        this.logger.warn('no mock configured for es search: ', body);
        return {};
      });
  }

  mockedResource(a, idx) {
    const id = idx + 1;
    return {
      resourceId: `octo${id}`,
      title: `title - ${id}`,
      url: `https://www.id${id}.come`,
      summary: `summary - ${id}`,
      journalMessage: `journal - ${id}`,
      category: (new Array(id)).fill(undefined).map((b, i) => `category - ${i + 1}`),
      groups: (new Array(id)).fill(undefined).map((b, i) => `groups - ${i + 1}`),
    };
  }

  restore() {
    nock.restore();
  }

  mockedResources(total) {
    return (new Array(total))
      .fill(undefined)
      .map((a, id) => this.mockedResource(a, id));
  }
}

module.exports = EsResourcesMock;
