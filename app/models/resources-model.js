const resourceIdProperty = 'resourceId';

class ResourcesModel {

  constructor({ searchService }) {
    this.searchService = searchService;
    this.resourceIdProperty = resourceIdProperty;
  }

  findAll() {
    return this.searchService.findAll();
  }

  findByKeyword(keyword) {
    return this.searchService.find(keyword);
  }

  findById(id) {
    return this.getRawData().find(i => i[this.resourceIdProperty] === id);
  }

  getRawData() {
    return this.searchService.rawData;
  }
}

module.exports = ResourcesModel;
