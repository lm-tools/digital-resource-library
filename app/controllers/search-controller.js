const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');

/* GET home page. */
router.get('/search', (req, res) => {
  const searchParam = req.query.search || '';
  res.render('search',
    {
      resourceList: resourceModel.findByKeyword(searchParam),
      search: searchParam,
    }
  );
});

module.exports = router;
