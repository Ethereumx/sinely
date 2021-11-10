const registerRepo = require('../repository');
const mail = require('../../../helpers/mail');
const {  REQUEST_SUCCESS } = require('../constants');

async function createfile(req, res) {
  let file = {};
  let fileName_={};let issuer_={};let recipient_={};let issuerId_={};


  try {
    fileName_=req.file.originalname;
    issuer_= req.user.name;
    recipient_=req.body.destination;
    issuerId_=req.user.id;
    message_=req.body.message;
    console.log(fileName_,issuer_,recipient_,issuerId_,message_)

    file = await registerRepo.createfile(fileName_,issuer_,recipient_,issuerId_,message_,req.file.path);

    const subject='Invitation à signer un document sur Sinely.com'
    const to= recipient_;
    const cc=req.user.email;
    //const content='Bonjour Vous êtes invité à signer un document sur sinely.com par'+issuer_+'deteneur de la boite mail : '+req.user.email;+    'en vous laissant le message suivant:'+message_;

    const contentHtml='Bonjour <br> Mr/Mme '+issuer_+'(en CC) vous invite à signer un document sur sinely.com <br> avec le message suivant:<br>'+message_ +
    '<br><br> Pour signer le document rendez vous sur www.sinely.com, créez un compte si vous ne en disposez pas déjà et sous le menu "Demande signature" vous trouverez le document à signer. <br><br>Cordialement <br> l\'équipe Sinely <br> <img src="http://sinely.com/img/logo.png" width="180px">';

 
    console.log("Log Sending an email")
    const m=mail.sendMail(subject,'',contentHtml,to,cc);

    console.log("\n INFO: Created request \n", file);
  } catch (error) {
    file = error;
    console.log("\n ERROR: error registring file",error)
  }
  if (file.fileName) {
    console.log("\n INFO: request saved")
    req.session.messages = { success: REQUEST_SUCCESS };
    res.redirect('/request');
  }
  else
  {
  const { code } = file;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  req.session.messages = { errors:databaseError };
  res.redirect('/request');
}
}

module.exports = createfile;
