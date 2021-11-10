const { wrap } = require('async-middleware');

const loadUser = require('./commands/load-page');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

module.exports = (router, middlewares = []) => {

  router.get('/checkuser/',isAuthenticated, (req, res)=> {

    res.render('vpages/users/check',{userDetails:''});
  })

  router.post('/checkuser/', middlewares.map(middleware => wrap(middleware)), wrap(loadUser));


  return router;
};
