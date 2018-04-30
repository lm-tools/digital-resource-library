const esHost = process.env.ES_ENDPOINT || (process.env.NODE_ENV !== 'production' &&
  'https://search-drl-dev-im47pucexv7nd5grs35lkejah4.eu-west-1.es.amazonaws.com');
const esIndex = process.env.ES_INDEX || 'drl-resources';
const apiKey = process.env.API_KEY;

module.exports = {
  elasticSearch: { host: esHost, index: esIndex },
  apiKey,
  env: process.env.NODE_ENV,
};
