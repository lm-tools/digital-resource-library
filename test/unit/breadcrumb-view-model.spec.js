require('../../app/middleware/i18n');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const breadcrumbModel = require('../../app/controllers/breadcrumb-view-model');

describe('breadcrumbModel', () => {
  describe('build', () => {
    [
      {
        request: '/',
        expected: [],
      },
      {
        request: '/page-is-not-here',
        expected: [],
      },
      {
        request: '/search',
        expected: [
          { title: 'Homepage', link: '/' },
          { title: 'Search', link: '/search' },
        ],
      },
      {
        request: '/search?search=CV%20and%20Resumes',
        expected: [
          { title: 'Homepage', link: '/' },
          { title: 'Search', link: '/search?search=CV%20and%20Resumes' },
        ],
      },
      {
        request: '/resources/octo003',
        expected: [
          { title: 'Homepage', link: '/' },
          { title: 'Search', link: '/search' },
          { title: 'My world of work CV Builder', link: '/resources/octo003' },
        ],
      },
      {
        request: '/resources/octo999999',
        expected: [
          { title: 'Homepage', link: '/' },
          { title: 'Search', link: '/search' },
          {},
        ],
      },

    ].forEach(p => {
      it(`should have the correct breadcrumb information for the request ${p.request}`, () => {
        expect(breadcrumbModel(p.request)).to.eql(p.expected);
      });
    });
  });
});
