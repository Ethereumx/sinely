const { getFile,getSigner,getEtablissement } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
  let fileInfo;
  let signerInfo;
  let etablissementInfo;
  const { user } = req;
  let hash;
  try {
  //console.log("---------hashfile------")
  //console.log("---------hashfile 2------",req.body.hashFile)

  if(typeof req.params.hashFile !=='undefined')
   {
     hash=req.params.hashFile;
    //  console.log("hash defined in req params",hash)
   }
   if(typeof req.body.hashFile !=='undefined')
   {
     hash=req.body.hashFile;
    //  console.log("hash defined in req body",hash)

   }
   if(hash.includes("sdata="))
   /* && */
   {


    
   // console.log("doe not has 7Bhash", hash)
    var Jsoncontent=hash.split("sdata=")
    var content=Jsoncontent[1]
    /*let buff = new Buffer(content, 'base64');
    content = buff.toString('ascii');
    console.log("base 64 form", content)*/
    var transformedString

    // if(!content.includes('"}') && content.includes('}')) //if does not contain "} =>just }
    // { 
    //   console.log(" does not contains } with quote and not base64")
    //   transformedString=content.replace('}','"}')
    // }
    if(hash.startsWith('sdata=%7Bhash') || hash.startsWith("sdata={hash") || hash.startsWith('sdata={"hash'))//Not base 64
    {
    transformedString=content;
    // console.log("----not contian----")
   
    transformedString=transformedString.replace('{hash:','{"hash":"')
    transformedString=transformedString.replace(',signature:','","signature":"')
    transformedString=transformedString.replace(',publicKey:','","publicKey":"')
    transformedString=transformedString.replace(/&#34;/g,'"')
    if(!hash.endsWith('"}')){
      transformedString=transformedString.replace('}','"}')

    }
    //console.log("transformed string",transformedString)
    const parssedJson=JSON.parse(transformedString)
    //console.log("transformed string",parssedJson)

    hash=parssedJson.hash
    //console.log("hash",hash)
    }
    else{
      let buff = new Buffer(content, 'base64');
    content = buff.toString('ascii');
    //console.log("base 64 form", content)
    const parssedJson=JSON.parse(content)
    //console.log("transformed string",parssedJson)

    hash=parssedJson.hash
      //console.log("hash",hash)
    }
   }


  // console.log("suppose url hash hash directly",hash)
 
    fileInfo = await getFile(hash);
    if(typeof fileInfo =='undefined')
      {
        req.session.messages = { errors: "fichier introuvable, veuillez fournir un ID de fichier correct" };
        console.log("error: fileInfo is", fileInfo)
        res.redirect('/adalia')
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
  
  
    res.render('vpages/adalia/file',{fileInfo:fileInfo, signerInfo:signerInfo,etablissementInfo:etablissementInfo,
      jsonSignature:fileInfo.qrcode, url:process.env.URL_ADDRESS,} );
    }
      
  } catch (getFileError) {
    req.session.messages = { errors: FETCH_INFO_ERROR_MESSAGE };
    console.log("error occured when retriving files", getFileError)
    res.redirect('/adalia')
  }


}


module.exports = loadPage;
