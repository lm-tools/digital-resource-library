const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');

/* GET home page. */
router.get('/search', (req, res) => {
  res.render('search', { resourceList: resourceModel.findAll() });
});

module.exports = router;
