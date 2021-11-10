
exports.up = function(knex) {
    return knex.schema.table('requests', function(t) {

        t.string('status');

    })
};

exports.down = function(knex) {
  
};
