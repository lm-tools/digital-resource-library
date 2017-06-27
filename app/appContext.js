const resourcesData = require('./data/resources');
const resourceModel = require('./models/resourcesModel')({ data: resourcesData });

module.exports = { resourceModel };
