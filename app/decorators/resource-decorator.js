module.exports = {
  decorateWithCategories: resource => {
    const categories = resource.category.map((category, i, a) => ({
      category,
      categoryEncoded: encodeURIComponent(category),
      hasNext: i !== a.length - 1,
    }));
    return Object.assign({ categories }, resource);
  },
};
