const knex = require('../../db');

 

async function getUserById(address) {
  const [user] = await knex('users')
    .where('b_address', address)
    .select('email', 'name', 'public_key','b_address','keystore','profilepic','verified');
  return user;
}
 
async function getUserByPubKey(pKey) {
  const [user] = await knex('users')
    .where('public_key', pKey)
    .select('email', 'name', 'public_key','b_address','keystore','profilepic','verified');
  return user;
}
async function getEtablissement(etabId) {
  const [institut] = await knex('etablissements')
    .where('etabId', etabId)
    .select("*");


  return institut;
}
module.exports = {
 
  getUserByPubKey,
  getUserById,
  getEtablissement,
};
