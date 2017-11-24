/* eslint-disable no-underscore-dangle */
const express = require('express');
const router = new express.Router();

router.get('/error/:id', (req, res, next) => {
  const e = new Error('Test error');
  e.status = req.params.id || 500;
  next(e);
});

module.exports = router;
