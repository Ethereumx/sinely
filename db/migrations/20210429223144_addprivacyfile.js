
exports.up = function(knex) {
    return knex.schema.table('files', function(t) {

        t.string('privacy');

    });
};

exports.down = function(knex) {
  
};
