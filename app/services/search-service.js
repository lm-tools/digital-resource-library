const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: 'https://search-drl-stage-lmqxl6kqabcoph56uaoug5nshu.eu-west-1.es.amazonaws.com',
  log: 'error'
});

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
