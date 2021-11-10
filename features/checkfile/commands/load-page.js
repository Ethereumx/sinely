 
  const { getFile,getSigner,getEtablissement } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageWithRedirect(req, res) {
  let fileInfo;
  let signerInfo;
  let etablissementInfo;
  const { user } = req;
  let hash;

 // console.log("-\n the received hashfile from params request \n:",req.params.hashFile)
  //console.log("\n the received hashfile from body request: ",req.body.hashFile)

  if(typeof req.params.hashFile !=='undefined')
   hash=req.params.hashFile;
   if(typeof req.body.hashFile !=='undefined')
   hash=req.body.hashFile;
   
   
  try {
    
    fileInfo = await getFile(hash);
    if(typeof fileInfo =='undefined')
      {
        req.session.messages = { errors: "Fichier introuvable, veuillez fournir un ID de fichier correct" };
        console.log("error: fileInfo is", fileInfo)
        res.redirect('/checkfile')
      }
    console.log('fileInfo.owner_id',fileInfo.owner_id)
    signerInfo= await getSigner(fileInfo.owner_id);
    
    if(signerInfo.type != "normal"){
      etablissementInfo= await getEtablissement(signerInfo.etablissement)
    }

  } catch (getFileError) {
    req.session.messages = { errors: FETCH_INFO_ERROR_MESSAGE };
    console.log("error occured when retriving files", getFileError)
    res.redirect('/checkfile')
  }

  req.session.fileInfo = { ...fileInfo };
  req.session.signerInfo = { ...signerInfo };
  req.session.etablissementInfo = { ...etablissementInfo };

  // console.log("returned file\n",  req.session.fileInfo )
  // console.log("returned user\n",  req.session.signerInfo )
  // console.log("returned etablissement\n",  req.session.etablissementInfo )
 

  res.render('vpages/file',{fileInfo:fileInfo, signerInfo:signerInfo,etablissementInfo:etablissementInfo,  jsonSignature:fileInfo.qrcode,  url:process.env.URL_ADDRESS} );
}


 

  module.exports = loadPageWithRedirect;


