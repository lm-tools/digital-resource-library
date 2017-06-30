const resourcesData = require('./data/resources');
const resourceModel = require('./models/resources-model')({ data: resourcesData });
const categoriesData = require('./data/categories');
const categoryModel = require('./models/categories-model')({ data: categoriesData });

module.exports = { resourceModel, categoryModel };
