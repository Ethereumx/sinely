const debug = require('debug')('express:login');

async function loadPage(req, res) {
  debug('login:loadPage', req, res);
  res.render('vpages/login');
}

module.exports = loadPage;
