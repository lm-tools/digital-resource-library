const express = require('express');
const { categoryModel } = require('../appContext');
const router = new express.Router();

router.get('/', (req, res) => {
  const categoryList = categoryModel.findAll();
  res.render('dashboard', { categoryList });
});

module.exports = router;
