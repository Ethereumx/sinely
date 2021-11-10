
const { getPendingUsers, } = require('../repository');
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');


async function loadusers(req, res, next) {
 
 
 
    let pendingUser_;
    let totalPending_=0;
    let allEtablissements_;

    const { user } = req;
    try {
    pendingUser_=await getPendingUsers();
     if(typeof pendingUser_[0]==='undefined')
      {
        pendingUser_={}
      }
      else {

        totalPending_=pendingUser_[0].count;
       }
       
    } catch (getUserError) {
      req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
      console.log("\n ERROR: an error occured when loading dashboard",getUserError)
      res.redirect('vpages/404.ejs')
    }

    res.render('vpages/users', {
        pendingUser:pendingUser_,
        totalPending:totalPending_, 
       });

   }

   module.exports = loadusers;