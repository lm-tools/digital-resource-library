const elasticsearch = require('elasticsearch');
const { logger } = require('./../appContext');

class SearchClient {
  constructor({ host, index, rawData, esType }) {
    this.host = host;
    this.index = index;
    this.rawData = rawData;
    this.esType = esType;
    this.esClient = new elasticsearch.Client({
      host,
      log: 'error',
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
            fields: ['title', 'url', 'summary', 'journalMessage', 'category', 'groups', 'sector.*'],
          },
        },
      },
    });
  }

  bulkIndex({ data = this.rawData, id = 'id' }) {
    const bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: this.index,
          _type: this.esType,
          _id: item[id],
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
        const successful = bulkBody.length - errorCount;
        logger.info(`Successfully indexed ${successful} out of ${bulkBody.length} resources`);
        this.rawData = data;
        return { errorCount, successCount: bulkBody.length };
      })
      .catch(logger.error);
  }
}

module.exports = SearchClient;
