 const knex = require('../../db');
 
 async function getAllSubs() {
  let xfiles= await knex('subscriptions').select()
  .orderBy('id', 'desc') ;

  return xfiles;
}

async function subscribeUser(email) {
 
  
  const [user] = await knex('subscriptions')
    .insert({
  email: email,

    })
    .returning(['email']);
  return user;
}

module.exports = {
  subscribeUser,
  getAllSubs,
};
