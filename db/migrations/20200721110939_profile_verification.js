
exports.up = function(knex) {
    return knex.schema.table('users', function(t) {

        t.boolean('verified');

    })
};

exports.down = function(knex) {
  
};
