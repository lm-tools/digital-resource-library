const express = require('express');
const { categoryModel, featuredModel } = require('../appContext');
const router = new express.Router();
// const moment = require('moment');

router.get('/', (req, res) => {
  // const scheduleDate = moment(req.query.scheduleFor).toDate();
  const categoryList = categoryModel.findAll();
  const categoryListRow1 = categoryList.slice(0, 3);
  const categoryListRow2 = categoryList.slice(3, 6);
  const featured = featuredModel.get();
  res.render('dashboard', { categoryListRow1, categoryListRow2, featured });
});

module.exports = router;
