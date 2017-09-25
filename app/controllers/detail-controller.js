const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');
const { decorateWithCategories } = require('../decorators/resource-decorator');

router.get('/resources/:id', (req, res) => {
  res.render('detail', { resource: decorateWithCategories(resourceModel.findById(req.params.id)) });
});

module.exports = router;
