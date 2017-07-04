function create({ basePath, siteUrl }) {
  return {
    dashboardUrl: () => `${basePath}/`,
    cookieUrl: () => `${basePath}/cookie`,
    searchUrl: (search) => `${basePath}/search${search ? `?search=${encodeURI(search)}` : ''}`,
    searchUrlAbsolute: (search) => `${siteUrl}${basePath}/search?search=${encodeURI(search)}`,
    detailsUrl: (resourceId) => `${basePath}/resources/${resourceId}`,
  };
}

module.exports = create;
