
const { getAllRequests,getAllSentRequests, } = require('../repository');
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');


async function loadrequests(req, res, next) {
 
 
    let allRequests_;
    let allSentRequests_;
    let totalPending_=0;
 
    const { user } = req;
    console.log('\n INFO: the current user: ',user)
    try {
    allRequests_=await getAllRequests(user.email);
    allSentRequests_=await getAllSentRequests(user.id);
    if(typeof allRequests_[0]==='undefined')
      {
        allRequests_={}
      }
      else {

        totalPending_=allRequests_[0].count;
        // console.log("========total req  \n",allRequests_[0].count);
      }
 
    } catch (getUserError) {
      req.session.messages = { errors: FETCH_INFO_ERROR_MESSAGE };
      console.log("\n ERROR: error when loading request list",getUserError)
      res.redirect('/requests')
    }

    res.render('vpages/requests/list.ejs', {
      requestsList:allRequests_,
      totalPending:totalPending_,
      allSentRequests:allSentRequests_,
       });

   }

   module.exports = loadrequests;