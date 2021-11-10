const knex = require('../../db');
var fs = require('fs');
const EthUtil=require('ethereumjs-util');


async function getAllRequests(email) {
  let xfiles= await knex('requests').select().where('recipient',email)
  .orderBy('fileId', 'desc') ;

  return xfiles;
}


async function getAllSentRequests(id) {
  let xfiles= await knex('requests').select().where('issuerId',id)
  .orderBy('fileId', 'desc') ;

  return xfiles;
}
async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('name', 'public_key','b_address');
  return user;
}

async function update_request_status(fileId,hash){
 //console.log("Updating file with :\n",fileId)
  const [request] = await knex('requests')
  .where({ 'fileId':fileId })
  .update({
    status:'signed',
    hash:hash,

  })
  .returning(['fileId','status']);
return request;
}



async function signFile(private_key, filePath, userId,filename,description,public_key) {

   
  let fileToSign ={}

  fileToSign=fs.readFileSync(filePath)
  console.log("fileToSign",fileToSign)
  const keccak256hash = EthUtil.keccak256(fileToSign);
  console.log("keccak256hash",keccak256hash)
  const messageHash = keccak256hash.toString('hex');
 
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
    type:'signed',
    description:description,
    path:filePath,
    qrcode:base64Qr,

  })
  .returning(['file_name', 'signature','hash','qrcode']);

return file;


}

async function createfile(fileName_,issuer_,recipient_,issuerId_,message_,path_) {


  
  const [request] = await knex('requests')
    .insert({
      fileName:fileName_,
      issuer:issuer_,
      recipient: recipient_,
      description: message_,
      issuerId: issuerId_,
      status:"En attente",
      path:path_,
    

    })
    .returning(['fileName', 'recipient']);
  return request;
}
async function getPrivateKey(id) {
  const [pkey] = await knex('users')
    .where('id', id)
    .select('private_key');
  return pkey;
}


module.exports = {
  createfile,
  getAllRequests,
  getUser,
  signFile,
  getPrivateKey,
  update_request_status,
  getAllSentRequests,
};
