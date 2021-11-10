const { wrap } = require('async-middleware');

const loaddashPagginated = require('./load_dashboard');
function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

module.exports = router => {


  router.get('/page/:page', isAuthenticated, wrap(loaddashPagginated));

  return router;
};
