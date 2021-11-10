const knex = require('../../db');


async function setQr(qr,fid){
  let xfiles= await knex('files') .update({
    qrcode:qr,
 }).where('id', fid);
return xfiles;
}
async function getFiles(id) {
  let xfiles= await knex('files').select()
    .where('owner_id', id).orderBy('id', 'desc') ;

  return xfiles;
}

async function getPagginFiles(id,page) {
  let xfiles= await knex('files').select()
    .where('owner_id', id).orderBy('id', 'desc').limit(10).offset(page*10) ;

  return xfiles;
}


async function getSignedFiles(id){
  let xfiles= await knex('files').select()
    .where('owner_id', id).where('type','signed').count();
    return xfiles;
}

async function getPendingFiles(id){
  let xfiles= await knex('requests').select()
    .where('issuerId', id).where('status','En attente').count();
    return xfiles;
}

async function getPendingreceivedFiles(email){
  let xfiles= await knex('requests').select()
    .where('recipient', email).where('status','En attente').count();
    return xfiles;
}


async function getIssuedFiles(id){
  let xfiles= await knex('files').select()
  .where('owner_id', id).where('type','issued').count();
  return xfiles;
}

module.exports = {
  getFiles,
  getSignedFiles,
  getPendingreceivedFiles,
  getIssuedFiles,
  getPendingFiles,
  setQr,
  getPagginFiles,
};
