const { wrap } = require('async-middleware');

// const requestBodyValidation = require('./commands/verify-request-body');
// const updateUserInfo = require('./commands/update-user-info');

const loadPage = require('./commands/load-page');

module.exports = (router, middlewares = []) => {
  router.get('/file/:hashFile',/* middlewares.map(middleware => wrap(middleware)),*/ wrap(loadPage));
  router.post('/file/',/* middlewares.map(middleware => wrap(middleware)),*/ wrap(loadPage));

  return router;
};
