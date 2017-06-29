const resourcesData = require('./data/resources');
const resourceModel = require('./models/resources-model')({ data: resourcesData });

module.exports = { resourceModel };
