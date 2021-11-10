const knex = require('../../db');

async function getorganismesLists() {
  let xfiles= await knex('etablissements').select()
    .orderBy('etabId', 'desc') ;

  return xfiles;
}

async function updateOrgInfo(id ) {
  const [user] = await knex('etablissements')
    .where({ id })
    .update({
      name,
      sigle,
      details,
    })
    .returning(['name','sigle','details' ]);
  return user;
}

async function newOrg(name_,sigle_,details_){
  const [user] = await knex('etablissements')
    .insert({
      name:name_,
      sigle:sigle_,
      details:details_,
    })
    .returning(['name','sigle','details' ]);
  return user;
}

module.exports = {
  getorganismesLists,
  newOrg,
  updateOrgInfo,
};
