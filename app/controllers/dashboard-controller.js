const express = require('express');
const { categoryModel } = require('../appContext');
const router = new express.Router();

router.get('/', (req, res) => {
  const categoryList = categoryModel.findAll();
  const categoryListRow1 = categoryList.slice(0, 3);
  const categoryListRow2 = categoryList.slice(3, 6);
  res.render('dashboard', { categoryListRow1, categoryListRow2 });
});

module.exports = router;
