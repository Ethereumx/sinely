
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {

        t.string('type');
        t.string('status');

    });
};

exports.down = function(knex) {
  
};
