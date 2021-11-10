
exports.up = function(knex) {
    return knex.schema.table('users', function(t) {

        t.string('keystore');

    })
};

exports.down = function(knex) {
  
};
