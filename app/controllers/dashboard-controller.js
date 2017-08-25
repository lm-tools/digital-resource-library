const express = require('express');
const { categoryModel, featuredModel } = require('../appContext');
const router = new express.Router();

router.get('/', (req, res) => {
  const categoryList = categoryModel.findAll();
  const categoryListRow1 = categoryList.slice(0, 3);
  const categoryListRow2 = categoryList.slice(3, 6);
  const featured = featuredModel.get();
  res.render('dashboard', { categoryListRow1, categoryListRow2, featured });
});

module.exports = router;
