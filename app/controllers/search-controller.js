const express = require('express');
const router = new express.Router();
const resourceList = require('../models/resources');

/* GET home page. */
router.get('/search', (req, res) => {
  res.render('search', { resourceList });
});

module.exports = router;
