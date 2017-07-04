require('../../app/middleware/i18n');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const breadcrumbViewModel = require('../../app/controllers/breadcrumb-view-model');

describe('breadcrumbViewModel', () => {
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
          { title: 'Home', link: '/' },
          { title: 'Results', link: '/search' },
        ],
      },
      {
        request: '/search?search=CV%20and%20Resumes',
        expected: [
          { title: 'Home', link: '/' },
          { title: 'Results', link: '/search?search=CV%20and%20Resumes' },
        ],
      },
      {
        request: '/resources/octo003',
        expected: [
          { title: 'Home', link: '/' },
          { title: 'Results', link: '/search' },
          { title: 'My world of work CV Builder', link: '/resources/octo003' },
        ],
      },
      {
        request: '/resources/octo999999',
        expected: [
          { title: 'Home', link: '/' },
          { title: 'Results', link: '/search' },
          {},
        ],
      },

    ].forEach(p => {
      it(`should have the correct breadcrumb information for the request ${p.request}`, () => {
        expect(breadcrumbViewModel(p.request)).to.eql(p.expected);
      });
    });
  });
});
