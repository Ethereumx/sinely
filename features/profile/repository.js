const knex = require('../../db');

async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('email', 'name', 'public_key','b_address','keystore','profilepic','verified');
  return user;
}

async function updateUserInfo({ name, username: email, id, profilepic }) {
  const [user] = await knex('users')
    .where({ id })
    .update({
      name,
      email,
      profilepic,
      updated_at: new Date(),
    })
    .returning(['email', 'name','public_key','b_address','profilepic' ]);
  return user;
}

module.exports = {
  getUser,
  updateUserInfo,
};
