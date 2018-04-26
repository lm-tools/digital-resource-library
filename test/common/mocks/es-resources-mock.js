const nock = require('nock');

class EsResourcesMock {
  constructor(esHost, resourcesModel) {
    this.esHost = esHost;
    this.resourcesModel = resourcesModel;
  }

  constructMockQuery({keyword="default search term", hits}) {
    return keyword.replace(/\s/g, '').length === 0 ? keyword :`${keyword} (${hits})`
  }

  destructureMockQuery(query) {
    const result = (/\(([^)]+)\)/).exec(query);
    const hits = Array.isArray(result) && result[1];
    if (hits && !isNaN(result[1])) {
      const keyword = query.replace(`(${hits})`,'');
      return {keyword, hits: Number(hits)};
    } else {
      return undefined
    }
  }

  mockEsSearch(mockResources) {
    return nock(this.esHost)
      .post(`/${this.resourcesModel.esIndex}/_search`)
      .reply(200, (url, body) => {
        // return all resources when matching all
        if (body && body.query && body.query.match_all) {
          return {
            hits: {
              max_score: 213,
              hits: mockResources.map((r, i) => ({
                _source: r,
                _score: i + 1
              })),
              total: mockResources.length
            }
          }
        }
        // search query is a number, return that number of results from the mockResults
        else if (body && body.query && body.query.multi_match) {
          const mockQuery = this.destructureMockQuery(body.query.multi_match.query);
          if (mockQuery) {
            return {
              hits: {
                max_score: 213,
                hits: mockResources.slice(0, mockQuery.hits).map((r, i) => ({
                  _source: r,
                  _score: i + 1
                })),
                total: mockQuery.hits
              }
            }
          }
        }
        console.warn('no mock configured for es search: ', body);
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
      category: (new Array(id)).fill(undefined).map((a, i) => `category - ${i + 1}`),
      groups: (new Array(id)).fill(undefined).map((a, i) => `groups - ${i + 1}`)
    };
  };

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
