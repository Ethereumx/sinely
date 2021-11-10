
exports.up = function(knex) {
    return knex.schema.table('users', function(t) {

        t.string('claim');

    });

};

exports.down = function(knex) {
  
};
