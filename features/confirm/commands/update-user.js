const registerRepo = require('../repository');

async function updateUser(req, res) {
  let user = {};
  const registerSuccessMessage = 'Votre compte a été confirmé avec succès.';

  try {
      const token= req.params.token;
    if(token)
    {
  
  
    user = await registerRepo.updateconfirmUser(token);
 
    }
    else 
     {
         throw "error has occured";
     }
 
  } catch (error) {
    user = error;
    console.log("\n ERROR: une erreur s'est produite lors de l'enregistrement de l'utilisateur",error)
  }
  if (user && user.email) {

    req.session.messages = { success: registerSuccessMessage };
 

    res.redirect('/login');
  }
  else{
   
  const databaseError = "Le lien de confirmation n'est pas valide";
  req.session.messages = { databaseError };
  res.redirect('/register');
  }

}

module.exports = updateUser;
