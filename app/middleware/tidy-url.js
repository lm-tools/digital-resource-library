const express = require('express');
const router = new express.Router();
const url = require('url');

router.get('*', (req, res, next) => {
  const path = req.baseUrl;
  const pathDedupeSlash = path
    .replace(/\/+/g, '/')
    .replace(/[\/]*$/g, ''); // If the last character in the path is a slash, express removes it
  if (path !== pathDedupeSlash) {
    return res.redirect(url.format({ pathname: pathDedupeSlash, query: req.query }));
  }
  return next();
});

module.exports = router;
