const { wrap } = require('async-middleware');

const loadPageWithRedirect = require('./commands/load-page');


module.exports = (router, middlewares = []) => {

  router.get('/checkfile', (req, res)=> {

    res.render('vpages/checkfile');
  })

  router.post('/checkfile', middlewares.map(middleware => wrap(middleware)), wrap(loadPageWithRedirect));


  return router;
};
