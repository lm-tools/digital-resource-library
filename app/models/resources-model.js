const _ = require('lodash');
const esIndex = 'drl-resources';
const searchService = new (require('../services/search-service'))(esIndex);
const resourcesRaw = require('./../data/resources');

module.exports = function ({ data }) {
  const searchableFields = ['title', 'url', 'summary', 'journalMessage', 'category', 'groups'];

  const searchInSingleItem = (object, query) => {
    const objWithOnlyTextFields = _.pick(object, searchableFields);
    const foundFields = _.values(objWithOnlyTextFields)
      .filter(it => it.toString().toLowerCase().includes(query.toLowerCase()));
    return foundFields.length > 0;
  };

  const esType = 'resource';
  const resourceIdProperty = 'resourceId';

  const findAll = () => searchService.findAll();
  const findByKeyword = keyword => searchService.find(keyword);
  const findById = (id) => data.find(i => i.resourceId === id);
  return { findAll, findByKeyword, findById, raw: resourcesRaw, esIndex, esType, resourceIdProperty };
};
