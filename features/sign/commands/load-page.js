const { getUser } = require('../repository');

async function loadPage(req, res) {
   
  res.render('vpages/sign');
}

module.exports = loadPage;
