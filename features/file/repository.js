const knex = require('../../db');

async function getFile(hash) {
  const [file] = await knex('files')
    .where('hash', hash)
    .select("*");
  return file;
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

async function accessFile(fileName){
  const path='uploads/'+fileName;
  const files= await knex('files')
    .where('path', path)
    .select("*");
  return files;
}

async function accessFileRequest(fileName){
  const path='uploads/'+fileName;
  const files= await knex('requests')
    .where('path', path)
    .select("*");
  return files;
}

module.exports = {
  getFile,
  getSigner, 
  getEtablissement,
  accessFile,
  accessFileRequest,
};
