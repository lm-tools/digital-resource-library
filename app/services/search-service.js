const elasticsearch = require('elasticsearch');
const esHost = process.env.ES_ENDPOINT || (process.env.NODE_ENV !== 'production' &&
  'https://search-drl-dev-im47pucexv7nd5grs35lkejah4.eu-west-1.es.amazonaws.com');

if (!esHost) {
  console.error('no elasticsearch endpoint set. In production env, the ES_ENDPOINT env variable' +
    'must be set');
}

const esClient = new elasticsearch.Client({
  host: esHost,
  log: 'error'
});

console.info(`using esHost: ${esHost}`);

class SearchClient {
  constructor(index) {
    this.index = index;
  }

  findAll() {
    return esClient.search({
      index: this.index, body: {
        size: 1000, // need to implement pagination
        query: {
          match_all: {}
        }
      }
    });
  }

  find(keyword) {
    return esClient.search({
      index: this.index, body: {
        size: 1000, // need to implement pagination
        query: {
          multi_match: {
            query: keyword,
            fields: ['title','url','summary', 'journalMessage', 'category', 'groups', 'sector.*']
          }
        }
      }
    })
  }

  bulkIndex(type, data, id = 'id') {
    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: this.index,
          _type: type,
          _id: item[id]
        }
      });

      bulkBody.push(item);
    });

    return esClient.bulk({ body: bulkBody })
      .then(response => {
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(`Successfully indexed ${bulkBody.length - errorCount} out of ${bulkBody.length} resources`);
        return { errorCount, successCount: bulkBody.length }
      })
      .catch(console.err);
  }
}

module.exports = SearchClient;
