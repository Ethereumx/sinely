
const { getAllSubs, } = require('../repository');
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');


async function loadsubs(req, res, next) {
 

 
    let subscribers;
    let totalSubscribers_=0;
    let allEtablissements_;
    const { user } = req;
    try {
    subscribers=await getAllSubs();
    if(typeof subscribers[0]==='undefined')
      {
        subscribers={}
      }
      else {

        totalSubscribers_=subscribers[0].count;
      }

     } catch (getUserError) {
      req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
      console.log("\n ERROR: an error occured when loading subs",getUserError)
      res.redirect('vpages/404.ejs')
    }
console.log("-------------------RendEring")
    res.render('vpages/subscribers/list', {
        subscribers:subscribers,
        totalSubscribers:totalSubscribers_, 
        });

   }

   module.exports = loadsubs;