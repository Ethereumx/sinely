
exports.up = function(knex, Promise) {
    return knex.schema.table('etablissements', function(t) {

        t.string('sigle');

    });
};

exports.down = function(knex) {
  
};
