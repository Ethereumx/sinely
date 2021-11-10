const { getUser,getInstitutions, } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
  let userInfo;
  let id=1;
  id=req.params.id;
  let etablist={}
  try {

    userInfo = await getUser(id);
    etablist=await getInstitutions();
  } catch (getUserError) {
    req.session.messages = { messages: FETCH_INFO_ERROR_MESSAGE };
    console.log("\n ERROR : an error occured when getting user details", getUserError)
    res.redirect('/pages/users')
  }


  res.render('vpages/users/update',{user:userInfo,etablist:etablist});
}

module.exports = loadPage;
