const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');

/* GET resource detail. */
router.get('/resources/:id/detail', (req, res) => {
  res.render('detail', { resource: resourceModel.findById(req.params.id) });
});

module.exports = router;
