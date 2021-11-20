const registerRepo = require('../repository');
const { USER_NOT_FOUND_ERROR_MESSAGE,SIGNATURE_ERROR_MESSAGE,FILE_NOT_FOUND_ERROR_MESSAGE,SIGN_INFO_SUCCESS_MESSAGE } = require('../constants');
const { getUser } = require('../repository');

async function signFile(req, res) {
  
  let file = {};
  let user = {};
  const {
    user: { id },
  } = req;
  try {
    userInfo = await getUser(user && id);
  } catch (getUserError) {
    console.log(" USER_NOT_FOUND_ERROR_MESSAGE",getUserError)
    const messages = {
      errors: USER_NOT_FOUND_ERROR_MESSAGE
    };

    return res.status(500).render('vpages/sign', { messages });
  }

  const registerSuccessMessage = SIGN_INFO_SUCCESS_MESSAGE;
  try {
    var statusFile="private";
    if(req.body.privacy=="on")
      {
        statusFile="public"
    }

    console.log('status file',statusFile)
    const getKey=await registerRepo.getPrivateKey(id);
    file = await registerRepo.signFile(getKey.private_key,req.file.path,id,
      req.file.originalname, req.body.description, statusFile,
      req.user.public_key); 
  
  } catch (error) {
    console.log("ERROR", error)
    req.session.messages = { errors: SIGNATURE_ERROR_MESSAGE  };
    file = error;
    res.redirect('/sign');
  }
  if (file.signature) {
   
    req.session.messages = { success: registerSuccessMessage, hash:file.hash, 
      signature:file.signature,
       publicKey:req.user.public_key,jsonSignature:file.qrcode ,
       url:process.env.URL_ADDRESS};

       req.session.userInfo = { ...userInfo };
    res.redirect('/sign');
  }
 else{
  const databaseError = SIGNATURE_ERROR_MESSAGE;
  req.session.messages = { errors: databaseError  };
  res.redirect('/sign');
  }

}


module.exports = signFile;
