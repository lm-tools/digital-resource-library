const i18n = require('i18n');
const resources = require('../data/resources');

/* eslint-disable no-underscore-dangle */

const requestToBreadcrumbMap = [
  { requestRegEx: /\/search/, page: 'search', trail: ['dashboard'] },
  { requestRegEx: /\/resources/, page: 'resource', trail: ['dashboard', 'search'] },
];

const crumbDefaults = {
  dashboard: { link: '/', title: i18n.__('breadcrumb.dashboard') },
  search: { link: '/search', title: i18n.__('breadcrumb.search') },
};

const resourceRegEx = /resources\/(.*)/;

function getResource(request) {
  const resource = resources.find(x => x.resourceId === request.match(resourceRegEx)[1]);
  return resource ? ({ link: `${request}`, title: resource.title }) : ({});
}

function getSearch(request) {
  return ({ link: `${request}`, title: i18n.__('breadcrumb.search') });
}

module.exports = function (request) {
  const trail = [];
  const breadcrumbRequest = requestToBreadcrumbMap.find(x => request.match(x.requestRegEx));

  if (breadcrumbRequest) {
    breadcrumbRequest.trail.forEach(crumb => {
      trail.push(crumbDefaults[crumb]);
    });

    switch (breadcrumbRequest.page) {
      case 'dashboard': {
        break;
      }
      case 'search': {
        trail.push(getSearch(request));
        break;
      }
      case 'resource': {
        trail.push(getResource(request));
        break;
      }
      default: {
        break;
      }
    }
  }
  return trail;
};
