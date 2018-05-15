const config = require('./config');
const logger = require('./../logger');
const resourcesData = require('./data/resources');
const SearchService = require('./services/search-service');
const searchService = new SearchService({
  rawData: resourcesData.map(r => Object.assign(r, { id: r.resourceId })),
  host: config.elasticSearch.host,
  index: config.elasticSearch.index,
  esType: 'resource',
  log: config.elasticSearch.log,
});
const ResourceModel = require('./models/resources-model');
const categoriesData = require('./data/categories');
const categoryModel = require('./models/categories-model')({ data: categoriesData });
const featuredData = require('./data/featured');
const schedule = require('./data/schedule');
const rotation = require('./data/rotation');
const scheduler = require('./models/scheduler')({ schedule, rotation });
const featuredModel = require('./models/featured-model')({ data: featuredData, scheduler });

const resourceModel = new ResourceModel({ searchService });

module.exports = { resourceModel, categoryModel, featuredModel, searchService, logger, config };
