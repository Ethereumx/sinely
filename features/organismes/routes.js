const { wrap } = require('async-middleware');

const loadorgs = require('./commands/load-page');
const updateOrg = require('./commands/update_org');
const addOrg = require('./commands/add-org');
const isAdmin = require('./commands/admin-authorize');

module.exports = (router, middlewares = []) => {
  router.get('/organismes',isAdmin, /*middlewares.map(middleware => wrap(middleware)), */wrap(loadorgs));
  router.get('/organismes/add',isAdmin, (req,res)=>{
    res.render('vpages/organismes/add.ejs')
  });
  
  router.post('/organismes/add', /*middlewares.map(middleware => wrap(middleware)), */wrap(addOrg));
  
  router.post('/organismes/update', /*middlewares.map(middleware => wrap(middleware)), */wrap(updateOrg));


  return router;
};
