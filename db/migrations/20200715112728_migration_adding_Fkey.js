
exports.up = function(knex, Promise) {

    return knex.schema.table('users', function(t) {

        t.integer('etablissement');

    }).table('users', function(table) {

   table.foreign('etablissement').references('etabId').inTable('etablissements');

    })
};

exports.down = function(knex) {
  
};
