function create({ basePath, siteUrl }) {
  return {
    dashboardUrl: () => `${basePath}/`,
    cookieUrl: () => `${basePath}/cookie`,
    searchUrl: (search) =>
      `${basePath}/search${search ? `?search=${encodeURIComponent(search)}` : ''}`,
    searchUrlAbsolute: (search) =>
      `${siteUrl}${basePath}/search?search=${encodeURIComponent(search)}`,
    detailsUrl: (resourceId, search) =>
      `${basePath}/resources/${resourceId}?fromSearch=${encodeURIComponent(search)}`,
  };
}

module.exports = create;
