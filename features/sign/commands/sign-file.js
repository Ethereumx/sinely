const registerRepo = require('../repository');
const { USER_NOT_FOUND_ERROR_MESSAGE,SIGNATURE_ERROR_MESSAGE,FILE_NOT_FOUND_ERROR_MESSAGE,SIGN_INFO_SUCCESS_MESSAGE } = require('../constants');
const { getUser } = require('../repository');
const path = require('path');

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
    if(req.body && req.body.path === undefined)
    { 
      file = await registerRepo.signFile(getKey.private_key,req.file.path,id,
      req.file.originalname, req.body.description, statusFile,
      req.user.public_key);
    }else
    {
      const url = req.body.path;
      const splitedPath = url.split('/');
      const fileName = splitedPath[splitedPath.length-1];
      const filePath = path.join(__dirname, '../../../uploads/'+fileName);
      file = await registerRepo.signFile(getKey.private_key,filePath,id,
        fileName, req.body.description, statusFile,
        req.user.public_key);
    }
  
  } catch (error) {
    console.log("ERROR", error)
    req.session.messages = { errors: SIGNATURE_ERROR_MESSAGE  };
    file = error;
    if(req.ajax === true)
        res.send('Error');
        else
        res.redirect('/sign');
  }
  if (file.signature) {
   
    req.session.messages = { success: registerSuccessMessage, hash:file.hash, 
      signature:file.signature,
       publicKey:req.user.public_key,jsonSignature:file.qrcode ,
       url:process.env.URL_ADDRESS};

       req.session.userInfo = { ...userInfo };
       if(req.ajax === true)
        res.send('Ok');
        else
        res.redirect('/sign');
  }
 else{
  const databaseError = SIGNATURE_ERROR_MESSAGE;
  req.session.messages = { errors: databaseError  };
  if(req.ajax === true)
        res.send('Error');
        else
        res.redirect('/sign');
  }

}


module.exports = signFile;
