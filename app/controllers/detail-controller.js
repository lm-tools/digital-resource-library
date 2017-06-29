const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');

router.get('/resources/:id', (req, res) => {
  res.render('detail', { resource: resourceModel.findById(req.params.id) });
});

module.exports = router;
