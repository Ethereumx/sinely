const { updateOrgInfo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateOrg(req, res) {
  let user = {};
  const {
    user: { id },
  } = req;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    user = await updateOrgInfo({ ...req.body, id });
  } catch (error) {
    user = error;
  }

  if (user.email) {
    req.session.messages = { success: profileSuccessMessage };
    req.session.userInfo = { ...user };
    res.redirect('/organismes/add');
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;
  req.session.messages = { errors: { databaseError } };
  res.redirect('/organismes/list');
}

module.exports = updateOrg;
