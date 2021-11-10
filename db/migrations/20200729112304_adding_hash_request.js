
exports.up = function(knex) {
    return knex.schema.table('requests', function(t) {

        t.string('hash');

    })
};

exports.down = function(knex) {
  
};
