/* eslint-disable no-underscore-dangle */
const express = require('express');
const router = new express.Router();
const { resourceModel } = require('../appContext');
const i18n = require('i18n');

const resultsSummaryCopy = (resourcesCount, search) => {
  if (resourcesCount === 1) {
    return i18n.__('search.singleResultFound');
  }
  return search ? i18n.__('search.resultsFound') : i18n.__('search.resultsFoundWithoutKeyword');
};

router.get('/search', (req, res) => {
  const search = (req.query.search || '').trim();
  const resourceList = resourceModel.findByKeyword(search);
  res.render('search',
    {
      resourceList,
      search,
      resultsSummaryCopy: resultsSummaryCopy(resourceList.length, search),
    }
  );
});

module.exports = router;
