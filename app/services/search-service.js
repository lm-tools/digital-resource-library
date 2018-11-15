const elasticsearch = require('elasticsearch');
const winston = require('winston');
const logger = require('./../../logger');
const ES_LOG_LEVEL_DEFAULT = 'warning';

function generateWinstonConsoleLogger(level) {
  return new winston.Logger({
    level,
    transports: [
      new (winston.transports.Console)({ timestamp: true }),
    ],
  });
}

function traceLogFn(method, requestUrl, body, responseBody, responseStatus) {
  this.debug({
    method,
    requestUrl,
    body,
    responseBody,
    responseStatus,
  });
}

function esLoggerFactory(esLogLevelConfig) {
  let esLogLevel = esLogLevelConfig;
  if (['trace', 'debug', 'info', 'warning', 'error'].indexOf(esLogLevel) < 0) {
    logger.warn(
      `unsupported es log level '${esLogLevelConfig}'. `,
      `Falling back to '${ES_LOG_LEVEL_DEFAULT}'`
    );
    esLogLevel = ES_LOG_LEVEL_DEFAULT;
  } else {
    logger.info(`es log level set to '${esLogLevel}'`);
  }

  class EsLogger2 {
    constructor() {
      const esLogger = generateWinstonConsoleLogger(esLogLevel);
      esLogger.trace = esLogLevel === 'trace' ? traceLogFn.bind(esLogger) : () => {
      };
      esLogger.warning = esLogger.warn.bind(esLogger); // warning is used by es
      return esLogger;
    }
  }

  return EsLogger2;
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
