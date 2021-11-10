const { newOrg } = require('../repository');
const { ADD_INFO_SUCCESS_MESSAGE, ADD_INFO_ERROR_MESSAGE } = require('../constants');

async function addOrg(req, res) {
  let user = {};
 
  const profileSuccessMessage = ADD_INFO_SUCCESS_MESSAGE;
  try {
    org = await newOrg(req.body.name,req.body.sigle,req.body.details);
  } catch (error) {
    org = error;
    console.log('\n ERROR : an error occured when adding a new  org :',error)
  }

  if (org.name) {
    req.session.messages = { success: profileSuccessMessage };
    res.redirect('/organismes/');
  }
else{
      const databaseError = ADD_INFO_ERROR_MESSAGE;
  req.session.messages = { errors: { databaseError } };
  res.redirect('/organismes/add');
}

}

module.exports = addOrg;
