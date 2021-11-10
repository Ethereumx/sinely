
exports.up = function(knex) {
    return knex.schema.table('files', function(t) {

        t.string('path');

    })
};

exports.down = function(knex) {
  
};
