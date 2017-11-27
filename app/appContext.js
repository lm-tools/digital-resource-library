const resourcesData = require('./data/resources');
const resourceModel = require('./models/resources-model')({ data: resourcesData });
const categoriesData = require('./data/categories');
const categoryModel = require('./models/categories-model')({ data: categoriesData });
const featuredDate = require('./data/featured');
const schedule = require('./data/schedule');
const rotation = require('./data/rotation');
const scheduler = require('./models/scheduler')({ schedule, rotation });
const featuredModel = require('./models/featured-model')({ data: featuredDate, scheduler });

module.exports = { resourceModel, categoryModel, featuredModel };
