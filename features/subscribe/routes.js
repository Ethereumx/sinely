const { wrap } = require('async-middleware');

const subcribe = require('./commands/subscribe-user');
const isAdmin = require('../users/commands/admin-authorize');
const loadsubs = require('./commands/load-all-subs');

module.exports = router => {
  router.get('/subscribe/all',isAdmin, wrap(loadsubs));

  router.post('/subscribe', /*wrap(requestBodyValidation), */ wrap(subcribe));

  return router;
};
