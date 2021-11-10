
exports.up = function(knex, Promise) {

    return knex.schema.table('requests', function(t) {

        t.integer('issuerId');

    }).table('requests', function(t) {

        t.foreign('issuerId').references('id').inTable('users');


    });
};

exports.down = function(knex, Promise) {
  
};
