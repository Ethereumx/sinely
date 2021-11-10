const knex = require('../../db');
var fs = require('fs');
var path = require('path');
const EthUtil=require('ethereumjs-util')


async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('name', 'public_key','b_address');
  return user;
}

   let resultOferification=false;

async function checkFile(signature, filePath, publickey) {

   //console.log("\n Checking file \n")
    let fileToSign ={}
 
    fileToSign=fs.readFileSync(filePath)
    const keccak256hash = EthUtil.keccak256(fileToSign);
    const messageHash = keccak256hash.toString('hex');
    //console.log(" message Hash is : ",messageHash)

    let providedSignature=signature;
    const r1=providedSignature.substring(2, 66);
    const s1=providedSignature.substring(66, 130);
    const v1=providedSignature.substring(130, 132);
    //console.log("Ecsignature variables are :",'\n',v1,'\n',r1,'\n',s1);

    const publicHexKey=publickey
    const publicKey=Buffer.from(publicHexKey, "hex")
    
    const r=Buffer.from(r1, "hex") //notice the removal of ox
    const v=parseInt(v1, 16);
    const s=Buffer.from(s1, "hex")
    
    //console.log(r)
    //console.log("vrs",v, r, s)
    
const isValidSig=EthUtil.isValidSignature(v, r, s,true)
//console.log("is a valid signature?",isValidSig)

    var verification = false
    if(isValidSig)
    {

 
      //crecover(msgHash: Buffer, v: number, r: Buffer, s:buffer)
      const pubKey = EthUtil.ecrecover(keccak256hash, v, r, s)
      //console.log("recovered public key", EthUtil.bufferToHex(pubKey))
  
  
      //console.log(publicHexKey)
      //console.log(EthUtil.bufferToHex(pubKey))
  
      if(publicHexKey==EthUtil.bufferToHex(pubKey)){
        resultOferification=true;
       // console.log("the pub keys match");
        verification = true;

        const [file] = await knex('files')
          .where('signature', signature)
        .select();
        return file;
        }
  
    }
    // else
    // {
    //   return undefined;
    // }

 
}


async function checkSignature(signature,  publickey) {

  //console.log("Log ======>\n Checking Signature \n")
    // let fileToSign ={}

    // fileToSign=fs.readFileSync(filePath)
    // const keccak256hash = EthUtil.keccak256(fileToSign);
    // const messageHash = keccak256hash.toString('hex');
    // console.log(" message Hash is : ",messageHash)

   let providedSignature=signature;
   const r1=providedSignature.substring(2, 66);
   const s1=providedSignature.substring(66, 130);
   const v1=providedSignature.substring(130, 132);
  // console.log("Ecsignature variables are :",'\n',v1,'\n',r1,'\n',s1);

   const publicHexKey=publickey
   const publicKey=Buffer.from(publicHexKey, "hex")
   
   const r=Buffer.from(r1, "hex") //notice the removal of ox
   const v=parseInt(v1, 16);
   const s=Buffer.from(s1, "hex")
   
   //console.log(r)
  // console.log("vrs",v, r, s)
   
  const isValidSig=EthUtil.isValidSignature(v, r, s,true)
  //console.log("Log =====> is a valid signature?",isValidSig)

   var verification = false
   if(isValidSig) //if sig correct return the file = we use it to get details about owner
   {


    //  //crecover(msgHash: Buffer, v: number, r: Buffer, s:buffer)
     //const pubKey = EthUtil.ecrecover(keccak256hash, v, r, s)
    //  console.log("recovered public key", EthUtil.bufferToHex(pubKey))
 
 
    //  console.log(publicHexKey)
    //  console.log(EthUtil.bufferToHex(pubKey))
 
  // if(publicHexKey==EthUtil.bufferToHex(pubKey)){
    //    resultOferification=true;
    //    console.log("the pub keys match");
    //    verification = true;

       const [file] = await knex('files')
         .where('signature', signature)
       .select();
       return file;
      // }
 
   }
   // else
   // {
   //   return undefined;
   // }


}

async function getSigner(owner_id) {
  const [user] = await knex('users')
    .where('id', owner_id)
    .select("*");


  return user;
}

async function getEtablissement(etabId) {
  const [institut] = await knex('etablissements')
    .where('etabId', etabId)
    .select("*");


  return institut;
}

async function getFile(hash) {
  const [file] = await knex('files')
    .where('hash', hash)
    .select("*");
  return file;
}
module.exports = {
  getUser,
  checkFile, 
  checkSignature,
  getSigner,
  getEtablissement,
  getFile,
};
