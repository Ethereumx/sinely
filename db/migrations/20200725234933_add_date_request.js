
exports.up = function(knex) {
    return knex.schema.table('requests', function(t) {

        t.string('path');

    })
};

exports.down = function(knex) {
  
};
