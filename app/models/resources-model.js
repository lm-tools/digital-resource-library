const SearchService = require('../services/search-service');
const resourcesRaw = require('./../data/resources');

const esType = 'resource';
const resourceIdProperty = 'resourceId';

module.exports = esIndex => {
  const searchService = new SearchService(esIndex);
  return {
    findAll: () => searchService.findAll(),
    findByKeyword: keyword => searchService.find(keyword),
    findById: (id) => resourcesRaw.find(i => i.resourceId === id),
    raw: resourcesRaw,
    esIndex,
    esType,
    resourceIdProperty
  };
};
