
exports.up = function(knex) {
    return knex.schema.table('users', function(t) {

        t.string('profilepic',100);

    });
};

exports.down = function(knex) {
  
};
