const debug = require('debug')('express:login');

const { FETCH_INFO_ERROR_MESSAGE,PENDING_ACCOUNT } = require('../constants');
const { getUserById } = require('../repository');

async function redirectToDashboard(req, res) {
  let userInfo;
  const { user } = req;
  try {
    userInfo = await getUserById(user && user.id);
    console.info("\n INFO: userinfo in redirection",userInfo)
    if(userInfo.status=="pending") 
    {
      const messages = {
        errors: {
          databaseError: PENDING_ACCOUNT,
        },
      };
      console.info("\n INFO: userinfo in redirection",messages)

      return res.status(500).render('vpages/login', { messages });
    }

  } catch (getUserError) {
    const messages = {
      errors: {
        databaseError: FETCH_INFO_ERROR_MESSAGE,
      },
    };
    console.error("Excep occured",messages)
    return res.status(500).render('vpages/login', { messages });
  }

  debug('login:redirectToDashboard');
  req.session.userInfo = { ...userInfo };
  return res.redirect('/');
}

module.exports = redirectToDashboard;
