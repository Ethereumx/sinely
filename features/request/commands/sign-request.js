const registerRepo = require('../repository');
const { USER_NOT_FOUND_ERROR_MESSAGE,SIGNATURE_ERROR_MESSAGE,SIGN_INFO_SUCCESS_MESSAGE } = require('../constants');
const { getUser } = require('../repository');


async function signRequest(req, res, next) {
  
  let file = {};
  let signedRequest= {};
  let user = {};
  const {
    user: { id },
  } = req;
    
  console.log("user",user,id)
  try {
    userInfo = await getUser(user && id);
    //console.log("userInfo",userInfo)
  } catch (getUserError) {
    console.log(" USER_NOT_FOUND_ERROR_MESSAGE",getUserError)
    const messages = {
      errors: USER_NOT_FOUND_ERROR_MESSAGE
    };

    return res.status(500).render('vpages/sign', { messages });
  }

  const registerSuccessMessage = SIGN_INFO_SUCCESS_MESSAGE;
  try {

    const getKey=await registerRepo.getPrivateKey(id);
    file = await registerRepo.signFile(getKey.private_key,req.body.path,id,req.body.name, req.body.description,req.user.public_key); 
    signedRequest= await registerRepo.update_request_status(req.body.fileId,file.hash);
    console.log("signedRequest",signedRequest,req.parameters);

  } catch (error) {
    console.log("\n ERROR: an error has occured while signign request :", error)
    req.session.messages = { errors: SIGNATURE_ERROR_MESSAGE  };
    file = error;
    res.redirect('/requests');
  }
  if (file.signature && signedRequest.status) {
  
    req.session.messages = { success: registerSuccessMessage, hash:file.hash, signature:file.signature, publicKey:req.user.public_key,jsonSignature:file.qrcode };
    console.log("\n INFO: in sign request the req.session.messages =",req.session.messages )
    req.session.userInfo = { ...userInfo };
    res.redirect('/requests');
  }
 else{

  const databaseError = SIGNATURE_ERROR_MESSAGE;
  req.session.messages = { errors: databaseError  };
  res.redirect('/requests');
  }


}

module.exports = signRequest;