const registerRepo = require('../repository');

async function subscribe(req, res) {
  let user = {};
  const registerSuccessMessage = 'Merci pour votre inscription.';

  try {
    user = await registerRepo.subscribeUser(req.body.email);
    
  } catch (error) {
    user = error;
    console.log("error subscribing user",error)
  }
  if (user.email) {
     
    req.session.messages = { suscriptionsuccess: registerSuccessMessage };
    res.redirect('/home#subscribe');
  }
  const { code } = user;
  const databaseError = 'Une erreur est survenue, veuillez réesayer.';
  
  req.session.messages = { subscriptionerror: databaseError };
  res.redirect('/home#subscribe');
}

module.exports = subscribe;
