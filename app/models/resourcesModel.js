const _ = require('lodash');

module.exports = function ({ data }) {
  const searchableFields = ['title', 'url', 'summary', 'journalMessage', 'category', 'groups'];

  const searchInSingleItem = (object, query) => {
    const objWithOnlyTextFields = _.pick(object, searchableFields);
    const foundFields = _.values(objWithOnlyTextFields)
      .filter(it => it.toString().toLowerCase().includes(query.toLowerCase()));
    return foundFields.length > 0;
  };

  const findAll = () => data;
  const findByKeyword = (keyword) => _.values(data).filter(it => searchInSingleItem(it, keyword));
  const findById = (id) => data.find((item) => item.resourceId === id);
  return { findAll, findByKeyword, findById };
};
