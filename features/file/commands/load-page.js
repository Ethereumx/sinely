const { getFile,getSigner,getEtablissement } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
  
  let fileInfo;
  let signerInfo;
  let etablissementInfo;
  const { user } = req;
  let hash;

  // console.log("---------hashfile--sdata----",req.query.sdata)
  // console.log("---------hashfile---hashfile---",req.params.hashFile)
  // console.log("---------hashfile reqbody hashfile------",req.body.hashFile)
  try {
  if(typeof req.params.hashFile !=='undefined')
   hash=req.params.hashFile;
  
   if(typeof req.body.hashFile !=='undefined')
   hash=req.body.hashFile;

   if(hash.includes("sdata="))
   {

    var Jsoncontent=hash.split("sdata=")
    var content=Jsoncontent[1]
    let buff = new Buffer(content, 'base64');
    content = buff.toString('ascii');
    console.log("base 64 form", content)
    var transformedString
    if(!content.includes('"}') && content.includes('}')) //if does not contain "} =>just }
    { 
      console.log(" does not contains } with quote and not base64")
      transformedString=content.replace('}','"}')
    }
    else 
    transformedString=content;

    transformedString=transformedString.replace('{hash:','{"hash":"')
    transformedString=transformedString.replace(',signature:','","signature":"')
    transformedString=transformedString.replace(',publicKey:','","publicKey":"')
    transformedString=transformedString.replace(/&#34;/g,'"')
    const parssedJson=JSON.parse(transformedString)
    hash=parssedJson.hash

   }

   
 
    fileInfo = await getFile(hash);
    if(typeof fileInfo =='undefined')
      {
        req.session.messages = { errors: "fichier introuvable, veuillez fournir un ID de fichier correct" };
        console.log("error: fileInfo is", fileInfo)
        res.redirect('/home')
      }
      else{
    console.log('fileInfo.owner_id',fileInfo.owner_id)
    signerInfo= await getSigner(fileInfo.owner_id);
    
    if(signerInfo.type != "normal"){
      etablissementInfo= await getEtablissement(signerInfo.etablissement)
    }


    req.session.fileInfo = { ...fileInfo };
    req.session.signerInfo = { ...signerInfo };
    req.session.etablissementInfo = { ...etablissementInfo };
  
    // console.log("returned file from session\ n",  req.session.fileInfo )
    // console.log("returned user from session \n",  req.session.signerInfo )
    // console.log("returned etab from session \n",  req.session.etablissementInfo )
   
  //console.log("-----------------*******-----------",fileInfo)
    res.render('vpages/file',{fileInfo:fileInfo, signerInfo:signerInfo,etablissementInfo:etablissementInfo,
      jsonSignature:fileInfo.qrcode,   url:process.env.URL_ADDRESS,} );
    }
  } catch (getFileError) {
    req.session.messages = { errors: FETCH_INFO_ERROR_MESSAGE };
    console.log("error occured when retriving files", getFileError)
    res.redirect('/')
  }

 
}


module.exports = loadPage;
