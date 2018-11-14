const elasticsearch = require('elasticsearch');
const logger = require('./../../logger');

function traceLog(method, requestUrl, body, responseBody, responseStatus) {
  logger.debug({
    method: method,
    requestUrl: requestUrl,
    body: body,
    responseBody: responseBody,
    responseStatus: responseStatus
  });
}

function esLoggerFactory(esLogLevelConfig) {
  class EsLogger {
    constructor() {
      const logLevelConfigMap = new Map();
      logLevelConfigMap.set('trace', traceLog);
      logLevelConfigMap.set('debug', logger.debug.bind(logger));
      logLevelConfigMap.set('info', logger.info.bind(logger));
      logLevelConfigMap.set('warning', logger.warn.bind(logger));
      logLevelConfigMap.set('error', logger.error.bind(logger));

      if (!logLevelConfigMap.get(esLogLevelConfig)) {
        throw new Error(`elasticsearch log level ${esLogLevelConfig} not in: ${logLevelConfigMap.keys()}`)
      }
      let minimumLogLevelHit = false;
      for (let [logLevel, logFn] of logLevelConfigMap.entries()) {
        if (minimumLogLevelHit || logLevel === esLogLevelConfig) {
          minimumLogLevelHit = true;
          this[logLevel] = logFn;
        } else {
          this[logLevel] = () => {/* do not log */
          };
        }
      }

      this.close = function () { /* winston's console logger does not need to be closed */
      };
    }
  }

  return EsLogger;
}

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
      log: esLoggerFactory(log),
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
