const knex = require('../../db');
var fs = require('fs');
var path = require('path');
const EthUtil=require('ethereumjs-util');
const { date } = require('joi');


async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('name', 'public_key','b_address');
  return user;
}

async function getPrivateKey(id) {
  const [pkey] = await knex('users')
    .where('id', id)
    .select('private_key');
  return pkey;
}

async function signFile(private_key, filePath, userId,filename,
  recipient,description,attribute1,attribute2,attribute3, 
  privacy,public_key) {

   console.log("strat signign")
    let fileToSign ={}
 try{
    console.log("file path \n", filePath)
    fileToSign=fs.readFileSync(filePath)
    //console.log("fileToSign",fileToSign)
    const keccak256hash = EthUtil.keccak256(fileToSign);
    console.log("keccak256hash",keccak256hash)
    const messageHash = keccak256hash.toString('hex');
    console.log("messageHash",messageHash)

    const privateKey=private_key;
    const ecSignature = EthUtil.ecsign(keccak256hash, new Buffer(privateKey, 'hex') )
    console.log("signature 2", ecSignature)
  
  
      let v = EthUtil.bufferToHex(ecSignature.v);
      let r = EthUtil.bufferToHex(ecSignature.r);
      let s = EthUtil.bufferToHex(ecSignature.s);
      console.log("v ",v,ecSignature.v)
      console.log("r ",r)
      console.log("s ",s)
      const aggregatedSignature= r+s.substring(2)+v.substring(2);
 
      const qrUrl= {'hash':messageHash, 'signature':aggregatedSignature,'publicKey':public_key};
      let objJsonStr = JSON.stringify(qrUrl);
      let base64Qr = Buffer.from(objJsonStr).toString("base64");

    const [file] = await knex('files')
    .insert({
      owner_id:userId,
      file_name:filename||'file',
      signature:aggregatedSignature,
      hash: messageHash,
      signed_at:new Date(),
      description:description,
      recipient:recipient,
      first_attribut:attribute1||'',
      second_attribut:attribute2||'',
      third_attribut:attribute3||'',
      type:'issued',
      path:filePath,
      privacy,
      qrcode:base64Qr,
    })
    .returning(['file_name', 'signature','hash','qrcode']);
    
    console.log("--------files inserted ---\n",file)
    return file;
  }catch(Error){
    console.log("--------error-------------\n", Error)
  }

  
 

}

module.exports = {
  getUser,
  signFile,
  getPrivateKey,
};
