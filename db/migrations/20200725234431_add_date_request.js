
exports.up = function(knex) {
    return knex.schema.table('requests', function(t) {

        t.timestamp('subcribed_at').defaultTo(knex.fn.now());

    })


};

exports.down = function(knex) {
  
};
