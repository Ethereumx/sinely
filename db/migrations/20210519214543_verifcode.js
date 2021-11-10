
exports.up = function(knex) {
    return knex.schema.table('users', function(t) {

        t.string('confirmationCode',100);

    });
    
};

exports.down = function(knex) {
  
};
