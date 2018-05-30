const elasticsearch = require('elasticsearch');
const logger = require('./../../logger');

class SearchClient {

  /**
   *
   * @param host: elasticsearch host
   * @param index: elasticsearch index to search / upload records to
   * @param rawData: rawData to add to the index
   * @param esType: elasticsearch doc type to add to new records when applying bulk upload
   * @param log: log level for elasticsearch, default: error
   */
  constructor({ host, index, rawData, esType, log = 'error' }) {
    this.host = host;
    this.index = index;
    this.rawData = rawData;
    this.esType = esType;
    this.esClient = new elasticsearch.Client({
      host,
      log,
    });
  }

  findAll() {
    return this.esClient.search({
      index: this.index,
      body: {
        size: 1000, // need to implement pagination
        query: {
          match_all: {},
        },
      },
    });
  }

  find(keyword) {
    return this.esClient.search({
      index: this.index,
      body: {
        size: 1000, // need to implement pagination
        query: {
          multi_match: {
            query: keyword,
            fields: ['title', 'url', 'summary', 'keywords', 'journalMessage', 'category', 'groups',
              'sector.*'],
          },
        },
      },
    });
  }

  bulkIndex() {
    const bulkBody = [];
    // elasticsearch bulk upload requires to items in the array for each doc to be uploaded:
    // [0]: action description
    // [1]: doc to index/update
    // [2]: action description
    // [3]: doc to index/update
    // ..[2n]: action description
    // ..[2n+1]: doc to index/update
    this.rawData.forEach(item => {
      bulkBody.push({
        index: {
          _index: this.index,
          _type: this.esType,
          _id: item.id,
        },
      });

      bulkBody.push(item);
    });

    return this.esClient.bulk({ body: bulkBody })
      .then(response => {
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            logger.error(++errorCount, item.index.error);
          }
        });
        const successful = this.rawData.length - errorCount;
        logger.info(`Successfully indexed ${successful} out of ${this.rawData.length} resources`);
        return { errorCount, successCount: this.rawData.length };
      })
      .catch(() => logger.error());
  }
}

module.exports = SearchClient;
