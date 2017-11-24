const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');
const { decorateWithCategories } = require('../decorators/resource-decorator');

router.get('/resources/:id', (req, res, next) => {
  const resource = resourceModel.findById(req.params.id);
  if (!resource) {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
  } else {
    res.render('detail', { resource: decorateWithCategories(resource) });
  }
});

module.exports = router;
