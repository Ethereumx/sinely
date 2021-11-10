const { wrap } = require('async-middleware');

const loadusers = require('./commands/load-page');
const isAdmin = require('./commands/admin-authorize');
const Updateusers=require('./commands/admin-validate');
const loadAllusers = require('./commands/load-all-users');

const loadPage = require('./commands/load-profile');

module.exports = (router, middlewares = []) => {
  
  router.get('/users',isAdmin, /*middlewares.map(middleware => wrap(middleware)), */wrap(loadusers));
  router.get('/users/list',isAdmin, /*middlewares.map(middleware => wrap(middleware)), */wrap(loadAllusers));

  router.post('/users/update',isAdmin, wrap(Updateusers));

  router.get('/users/edit/:id',isAdmin, wrap(loadPage));

  return router;
};


