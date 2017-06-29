const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const resourcesModel = require('../../app/models/resources-model');

describe('resourcesModel', () => {
  describe('search by keyword', () => {
    let underTest;
    const aResource = (suffix) => ({
      resourceId: `resourceId-${suffix}`,
      title: `Title-${suffix}`,
      url: `Url-${suffix}`,
      summary: `Summary-${suffix}`,
      journalMessage: `JournalMessage-${suffix}`,
      category: [`Category-${suffix}-1`, `category-${suffix}-2`],
      groups: [`Group-${suffix}-1`, `group-${suffix}-2`],
    });

    const resources = [
      aResource('workie'),
      aResource('ripley'),
    ];
    const [workieResource, ripleyResource] = resources;

    beforeEach(() => {
      underTest = resourcesModel({ data: resources });
    });

    [
      { name: 'empty when keyword not found', keyword: 'wrong-keyword', result: [] },
      { name: 'empty when matched only resourceId', keyword: 'resourceId', result: [] },
      { name: 'match single by title', keyword: 'title-workie', result: [workieResource] },
      { name: 'match single by url', keyword: 'url-ripley', result: [ripleyResource] },
      { name: 'match single by summary', keyword: 'summary-workie', result: [workieResource] },
      {
        name: 'match single by journalMessage',
        keyword: 'journalMessage-ripley',
        result: [ripleyResource],
      },
      { name: 'match single by category', keyword: 'category-ripley-1', result: [ripleyResource] },
      { name: 'match single by group', keyword: 'group-workie-2', result: [workieResource] },
      { name: 'match multiple by title', keyword: 'title', result: resources },
      { name: 'match multiple by url', keyword: 'url', result: resources },
      { name: 'match multiple by summary', keyword: 'summary', result: resources },
      { name: 'match multiple by journalMessage', keyword: 'journalMessage', result: resources },
      { name: 'match multiple by category', keyword: 'category', result: resources },
      { name: 'match multiple by group', keyword: 'group', result: resources },
    ].forEach(s => {
      it(s.name, () =>
        expect(underTest.findByKeyword(s.keyword)).to.eql(s.result)
      );
    });
  });
});
