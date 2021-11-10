const registerRepo = require('../repository');
const { USER_NOT_FOUND_ERROR_MESSAGE,SIGNATURE_ERROR_MESSAGE,FILE_NOT_FOUND_ERROR_MESSAGE,SIGN_INFO_SUCCESS_MESSAGE } = require('../constants');
const { getUser } = require('../repository');

async function signFile(req, res) {
 
  let file = {};
  //let user = {};
//const {    user: { id },  } = req;
const { user } = req;
const id=user.id;
// console.log("LoG => user",user,id)
  try {
    userInfo = await getUser(user && id);
   } catch (getUserError) {
    console.log("USER_NOT_FOUND_ERROR_MESSAGE",getUserError)
    const messages = {
      errors:  USER_NOT_FOUND_ERROR_MESSAGE  };

    return res.status(500).render('vpages/issue', { messages });
  }

  const registerSuccessMessage = SIGN_INFO_SUCCESS_MESSAGE;
  try {
    var statusFile="private";
    if(req.body.privacy=="on")
      {
        statusFile="public"
    }
    // console.log("content of req.files :\n",req.files, 'content of req.file :/n',req.file)


    const getKey=await registerRepo.getPrivateKey(id);
    //console.log("The retrieved privateKey is : ",getKey.private_key)

    //console.log("req.body value is :",req.body)

    const description=req.body.description;
    const recipient= req.body.recipient ;
    const attribute1= req.body.attribute_2;
    const attribute2=req.body.attribute_3;
    const attribute3=req.body.attribute_4;
    console.log("=============================================================================")
    console.log("\n File data \n \n","desc:",description,"\n recepient:",recipient,"\n att1:",attribute1,"\n att2:",attribute2,"\n att3:",attribute3,"pubky",req.user.public_key)
    console.log("\n =============================================================================")

    file = await registerRepo.signFile(getKey.private_key,req.file.path,id,req.file.originalname,
      recipient,description,attribute1,attribute2,attribute3, statusFile,req.user.public_key); 
  

  } catch (error) {

    console.log("\n ERROR has occured \n", error)
    req.session.messages = { errors: SIGNATURE_ERROR_MESSAGE  };
    file = error;
    res.redirect('/issue');
  }

  if (file && file.signature) {
 
 
    req.session.messages = { success: registerSuccessMessage, hash:file.hash, signature:file.signature, 
      publicKey:req.user.public_key,jsonSignature:file.qrcode ,
      url:process.env.URL_ADDRESS};
    // console.log("\n Info: req.session.messages ",req.session.messages )
   console.log('\n Info: req.session.mess ',req.session.messages )

    res.redirect('/issue');
  }
 else{
  console.log("\n Sign controller should redirect with error message \n")

  const databaseError = SIGNATURE_ERROR_MESSAGE;
  req.session.messages = { errors: databaseError  };
  res.redirect('/issue');
  }
}

module.exports = signFile;
