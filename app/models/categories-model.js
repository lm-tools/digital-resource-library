const _ = require('lodash');
module.exports = function ({ data }) {
  this.data = _.merge(_.cloneDeep(data),
    data.map((i) => ({ uriEncodedTitle: encodeURIComponent(i.title) }))
  );

  const findAll = () => this.data;

  return { findAll };
};
