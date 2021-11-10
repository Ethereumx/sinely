const { wrap } = require('async-middleware');

const { logout } = require('./commands/logout');

module.exports = (router, middlewares = []) => {
  router.get('/logout', middlewares.map(middleware => wrap(middleware)), 
  wrap(logout));

  return router;
};
