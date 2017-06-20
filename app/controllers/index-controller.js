const express = require('express');
const router = new express.Router();
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const _ = require('lodash');
let articles;

router.get('/:slug', (req, res) => {
  const article = articles.find(a => a.slug === req.params.slug);
  res.render('index', { article });
});

Metalsmith(`${__dirname}/../../content`)
  .use(markdown())
  .process(function (err, files) {
    console.log(err)
    articles = _.values(files)
  });


module.exports = router;
