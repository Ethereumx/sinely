const knex = require('../../db');


async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('*');
  return user;
}

async function getPendingUsers() {
  let xfiles= await knex('users').select()
    .where('status', 'pending').orderBy('id', 'desc') ;

  return xfiles;
}
async function getAllUsers() {
  let xfiles= await knex('users').select()
  .orderBy('id', 'desc') ;

  return xfiles;
}
async function getInstitutions() {
  let xfiles= await knex('etablissements').select('*');

  return xfiles;
}

async function validateUsers(id,name,status, etablissement,verified,type) {
  console.log("--------update user -------")
  let user= await  knex("users")
  .where({id: id}).update({name:name,
    status:status,
    etablissement:etablissement,
    verified:verified,
    updated_at: new Date(),
    type:type,
  }).returning('*')
  .then(result => console.log("Result", result))

return user;
}
 

module.exports = {
  getPendingUsers,
  getInstitutions,
  validateUsers,
  getUser,
  getAllUsers,
};
