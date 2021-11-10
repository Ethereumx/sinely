
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('b_address').notNull().defaultTo("oxoo"); 

    });
};

exports.down = function(knex, Promise) {
  
};
