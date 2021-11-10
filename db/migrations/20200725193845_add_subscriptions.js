
exports.up = function(knex, Promise) {
    return knex.schema.createTable('subscriptions', table => {
        table
          .increments('id')
          .unsigned()
          .notNullable()

        table.string('email').notNullable();
        table.string('comment');
        table.timestamp('subcribed_at').defaultTo(knex.fn.now());

      });


     
};


exports.down = function(knex) {
  
};
