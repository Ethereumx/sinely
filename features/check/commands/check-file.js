
const registerRepo = require('../repository');
const { UNABLE_TO_CHECK_MESSAGE,CHECK_ERROR_MESSAGE,CHECK_INFO_SUCCESS_MESSAGE,   } = require('../constants');
const { getSigner,getEtablissement } = require('../repository');

var QRReader = require('qrcode-reader');
var Jimp = require("jimp");
var fs = require('fs');
 
 

 
async function checkFile(req, res) {
 
  
  let file = {};
  let signature={};
  let etablissementInfo=""
  let publickey={}
  const { user } = req;

  let isValidSig=false;
  const allFiles = JSON.parse(JSON.stringify(req.files)); 
  // console.log('LoG==========>',allFiles); // { title: 'product' }
try { 
   // Qr code not uploaded
    
    // console.log("Log =====> no qr uloaded \n")
    signature= req.body.signature;
    publickey=req.body.publicKey;
    file=await registerRepo.checkSignature(signature,publickey) 

    if(file && file.hash ){
      // console.info("LoG====>file returned ", file)
      // console.info("LoG: File owner", file.owner)
      signerInfo= await getSigner(file.owner_id);
    
      if(signerInfo.type != "normal"){
        etablissementInfo= await getEtablissement(signerInfo.etablissement)
      }
      fileInfo = file;
      req.session.fileInfo = { ...fileInfo };
      req.session.signerInfo = { ...signerInfo };
      req.session.etablissementInfo = { ...etablissementInfo };

   
      res.render('vpages/file',{fileInfo:fileInfo, signerInfo:signerInfo,etablissementInfo:etablissementInfo,
        jsonSignature:fileInfo.qrcode,   url:process.env.URL_ADDRESS,} );   
     }
    else {
      req.session.messages = { errors: CHECK_ERROR_MESSAGE,  };
      res.redirect('/check');
    }

  } catch (error) {
    console.log("LoG =======> qr code verif ERROR", error)
    file = error;
    const messages = {
      errors:  UNABLE_TO_CHECK_MESSAGE,
    };

    return res.status(500).render('vpages/check', { messages });
  }


}

module.exports = checkFile;
