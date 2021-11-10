const { wrap } = require('async-middleware');

const updateUser = require('./commands/update-user');

module.exports = router => {
  router.get('/confirm/:token', wrap(updateUser));


  return router;
};
