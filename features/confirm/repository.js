const knex = require('../../db');

async function getconfirmUser(id) {
  const [user] = await knex('users')
    .where('confirmationCode', id)
    .select('id','email', 'name');
  return user;
}

async function updateconfirmUser( code ) {
  const [user] = await knex('users')
    .where('confirmationCode', code)
    .update({
    status:"active",
    })
    .returning(['email', 'name','public_key','b_address','status' ]);
  return user;
}

module.exports = {
  updateconfirmUser,
    getconfirmUser,
  };
  