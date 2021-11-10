const registerRepo = require('../repository');
const mail=require('../../../helpers/mail');

async function createUser(req, res) {
  let user = {};
  const registerSuccessMessage = "Vous êtes inscrit avec succès. Nous vous avons ennvoyé un email de confirmation à votre addresse email. Veuillez vérifier votre boite SPAM si vous n'arriver pas à le trouver";
 
  try {
    user = await registerRepo.createUser(req.body);

   /**********************************
    * Sending Mail
    *  */
    const subject='Vérification de compte Sinely.com'
    const to= user.email;
    const cc='';
    const token=user.confirmationCode;
    const url=process.env.URL_ADDRESS;
    const contentHtml='Bonjour Mr/Mme '+user.name +'<br><br> Nouv vous remercions pour votre inscription. Veuillez vérifier votre compte Email en cliquant sur le lien suivant :<br>'+
    '<a href="https://'+url+'/confirm/'+token+'"> '+url+'/confirm/'+token+'</a>'+
    '<br><br>Cordialement <br> l\'équipe Sinely <br> <img src="http://sinely.com/img/logo.png" width="180px">';
 
    console.log("Log Sending an email")
    const m=mail.sendMail(subject,'',contentHtml,to,cc);


  } catch (error) {
    user = error;
    console.log("\n ERROR: une erreur s'est produite lors de l'enregistrement de l'utilisateur",error)
  }
  if (user.email) {
    // console.log("user.claim\n",user.claim)
     req.session.messages = { success: registerSuccessMessage };
 

    res.redirect('/login');
  }
  else{
      const { code } = user;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  req.session.messages = { databaseError };
  res.redirect('/register');
  }

}

module.exports = createUser;
