const i18n = require('i18n');
const winston = require('winston');
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      stringify: JSON.stringify,
    }),
  ],
});

/* eslint-disable no-underscore-dangle */
const errorModel = (app, err) => {
  const status = parseInt(err.status, 10) || 500;
  const model = { message: i18n.__(`error.${status}`) };
  if (/^development|test$/.test(app.get('env'))) model.error = err;
  return model;
};

module.exports = app => {
  app.use((err, req, res, next) => {
    if (app.get('env') !== 'test') {
      // eslint-disable-next-line no-console
      logger.error(err.stack);
    }
    const status = parseInt(err.status, 10) || 500;
    res.status(status);
    if (status === 404) res.render(`${status}`, errorModel(app, err));
    else next(err);
  });

  // catch all error view
  /* eslint-disable no-unused-vars */
  app.use((err, req, res, next) => res.render('error', errorModel(app, err)));
};
