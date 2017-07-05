const i18n = require('i18n');
const url = require('url');

const resources = require('../data/resources');

/* eslint-disable no-underscore-dangle */

const requestToBreadcrumbMap = [
  { requestRegEx: /\/search/, page: 'search' },
  { requestRegEx: /\/resources/, page: 'resource' },
];

function getFromSearchParam(requestUrl) {
  return requestUrl.query && requestUrl.query.fromSearch ?
    encodeURI(requestUrl.query.fromSearch) : '';
}

function getHomepageCrumb() {
  return ({ link: '/', title: i18n.__('breadcrumb.dashboard') });
}

function getSearchCrumb(requestUrl) {
  if (requestUrl) {
    return ({
      link: `/search?search=${getFromSearchParam(requestUrl)}`,
      title: i18n.__('breadcrumb.search'),
    });
  }
  return ({ title: i18n.__('breadcrumb.search') });
}

function getResourceCrumb(request) {
  const resourceId = url.parse(request, true).pathname.match(/resources\/(.*)/)[1];
  const resource = resources.find(x => x.resourceId === resourceId);
  return resource ? ({ title: resource.title }) : ({});
}

module.exports = function (request) {
  const trail = [];
  const breadcrumbRequest = requestToBreadcrumbMap.find(x => request.match(x.requestRegEx));

  if (breadcrumbRequest) {
    const requestUrl = url.parse(request, true);

    switch (breadcrumbRequest.page) {
      case 'search': {
        trail.push(getHomepageCrumb(), getSearchCrumb());
        break;
      }
      case 'resource': {
        trail.push(getHomepageCrumb(), getSearchCrumb(requestUrl), getResourceCrumb(requestUrl));
        break;
      }
      default: {
        break;
      }
    }
  }
  return trail;
};
