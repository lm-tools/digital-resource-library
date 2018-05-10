/* eslint-disable no-underscore-dangle */
const express = require('express');
const router = new express.Router();
const { resourceModel, searchService, logger, config } = require('../appContext');

const i18n = require('i18n');

const resultsSummaryCopy = (resourcesCount, search) => {
  if (resourcesCount === 1) {
    return i18n.__('search.singleResultFound');
  }
  return search ? i18n.__('search.resultsFound') : i18n.__('search.resultsFoundWithoutKeyword');
};

router.get('/index', (req, res, next) => {
  if (config.env !== 'production' || (config.apiKey && config.apiKey === req.query.key)) {
    searchService.bulkIndex()
      .then(({ errorCount, successCount }) => {
        if (errorCount) {
          res.status(400).send(`ERROR: ${errorCount} out of ${successCount} failed. Check logs`);
        } else {
          res.status(200).send(`Successfully indexed ${successCount} records`);
        }
      });
  } else {
    let noAuthReason;
    if (!config.apiKey) {
      noAuthReason = 'API_KEY env var must be set for production';
    } else {
      noAuthReason = 'Key must match API_KEY env var';
    }
    const err = new Error('Not authorized. Api protected for environment production.',
      noAuthReason);
    err.status = 401;
    next(err);
  }
});

function searchResultsResponse(res, search, results) {
  return res.render('search',
    {
      maxScore: results.hits.max_score,
      resourceList: results.hits.hits.map((r, resultNum) => Object.assign(r._source, {
        score: r._score,
        resultNum: resultNum + 1,
      })),
      resultsSummaryCopy: resultsSummaryCopy(results.hits.total, search),
      search,
      hasResults: (results.hits.total > 0),
    }
  );
}

router.get('/search', (req, res) => {
  const search = (req.query.search || '').trim();
  return (search ? resourceModel.findByKeyword(search) : resourceModel.findAll())
    .then(resourceList => searchResultsResponse(res, search, resourceList))
    .catch(e => logger.error(e));
});

module.exports = router;
