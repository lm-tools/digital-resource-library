/* eslint-disable no-underscore-dangle */
const express = require('express');
const router = new express.Router();
const { resourceModel, searchService } = require('../appContext');
const i18n = require('i18n');

const resultsSummaryCopy = (resourcesCount, search) => {
  if (resourcesCount === 1) {
    return i18n.__('search.singleResultFound');
  }
  return search ? i18n.__('search.resultsFound') : i18n.__('search.resultsFoundWithoutKeyword');
};

router.get('/index', (req, res) => {
  searchService.bulkIndex(resourceModel.esType, resourceModel.findAll(), resourceModel.resourceIdProperty)
    .then(({errorCount, successCount}) => {
      if (errorCount) {
        res.status(400).send(`ERROR: ${errorCount} out of ${successCount} failed. Check logs`);
      }
      else {
        res.status(200).send(`Successfully indexed ${successCount} records`);
      }
    });
});

function searchResultsResponse(res, search, results) {
  return res.render('search',
    {
      maxScore: results.hits.max_score,
      resourceList: results.hits.hits.map(r => Object.assign(r._source, {score: r._score})),
      resultsSummaryCopy: resultsSummaryCopy(results.hits.total, search),
      search,
      hasResults: (results.hits.total > 0),
    }
  );
}

router.get('/search', (req, res) => {
  const search = (req.query.search || '').trim();

  if (!search) {
    return resourceModel.findAll()
        .then(resourceList => searchResultsResponse(res, search, resourceList))
        .catch(e => console.error(e));
  } else {
    return resourceModel.findByKeyword(search)
      .then(resourceList => searchResultsResponse(res, search, resourceList))
      .catch(e => console.error(e));;
  }
});

module.exports = router;
