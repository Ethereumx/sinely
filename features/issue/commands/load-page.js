const { getUser } = require('../repository');

async function loadPage(req, res) {
   
  res.render('vpages/issue');
}

module.exports = loadPage;
