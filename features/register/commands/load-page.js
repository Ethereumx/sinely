const debug = require('debug')('express:login');
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');
const { getorganismesLists, } = require('../repository');


async function loadPage(req, res) {
  //debug('login:loadPage', req, res);
  let organismesList_=0;
  let totalPending_=0;

  const { user } = req;
  try {
    console.log("returned 1 list")

    organismesList_=await getorganismesLists();
    console.log("returned org list")
    if(typeof organismesList_[0]==='undefined') // no orgg returned
    {
      organismesList_={}
    }
    else {

      totalPending_=organismesList_[0].count;
     }

  // console.log("files--------------------",files)
  } catch (getUserError) {
    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
    console.log("\n ERROR: an error occured when loading dashboard",getUserError)
    res.redirect('vpages/404.ejs')
  }

   res.render('vpages/register', {
      organismesList:organismesList_,total_:totalPending_
     });
    
   
}

module.exports = loadPage;
