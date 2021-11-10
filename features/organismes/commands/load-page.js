
const { getorganismesLists, } = require('../repository');
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');


async function loadorgs(req, res, next) {
 
 
 
    let organismesList_=0;
    let totalPending_=0;

    const { user } = req;
    try {
      organismesList_=await getorganismesLists();
      
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

    res.render('vpages/organismes/list.ejs', {
        organismesList:organismesList_,
       });

   }

   module.exports = loadorgs;