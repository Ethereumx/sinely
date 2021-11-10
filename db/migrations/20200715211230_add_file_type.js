
exports.up = function(knex) {
    return knex.schema.table('files', function(t) {

        t.string('type');

    });
};

exports.down = function(knex) {
  
};
