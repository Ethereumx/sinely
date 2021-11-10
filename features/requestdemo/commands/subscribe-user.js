const registerRepo = require('../repository');

async function subscribe(req, res) {
  let user = {};
  const registerSuccessMessage = 'nous vous remercions par avance pour l\'intérêt porté à Sinely et prendrons contact avec vous dans les meilleurs délais.';

  try {
    user = await registerRepo.subscribeUser(req.body.email);
    
  } catch (error) {
    user = error;
    console.log("error subscribing user",error)
  }
  if (user.email) {
     
    req.session.messages = { suscriptionsuccess: registerSuccessMessage };
    res.redirect('/plans#subscribe');
  }
  const { code } = user;
  const databaseError = 'Une erreur est survenue, veuillez réesayer.';
  
  req.session.messages = { subscriptionerror: databaseError };
  res.redirect('/plans#subscribe');
}

module.exports = subscribe;
