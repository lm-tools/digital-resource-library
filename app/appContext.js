const resourcesData = require('./data/resources');
const resourceModel = require('./models/resources-model')({ data: resourcesData });
const categoriesData = require('./data/categories');
const categoryModel = require('./models/categories-model')({ data: categoriesData });
const featuredDate = require('./data/featured');
const featuredModel = require('./models/featured-model')({ data: featuredDate });

module.exports = { resourceModel, categoryModel, featuredModel };
