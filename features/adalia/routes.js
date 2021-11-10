const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');
const loadPageFile = require('./file/commands/load-page');

module.exports = (router, middlewares = []) => {
  router.get('/adalia',   wrap(loadPage));
  router.get('/adalia/file/:hashFile',/* middlewares.map(middleware => wrap(middleware)),*/ wrap(loadPageFile));
  router.post('/adalia/file/',/* middlewares.map(middleware => wrap(middleware)),*/ wrap(loadPageFile));

  return router;
};
