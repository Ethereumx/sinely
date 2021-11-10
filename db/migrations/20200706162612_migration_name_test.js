
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('private_key').notNull().defaultTo("oxoo");
        t.string('public_key').notNull().defaultTo("oxoo");

    });
};

exports.down = function(knex, Promise) {
  
};
