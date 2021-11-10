
exports.up = function(knex, Promise) {
    return knex.schema.createTable('requests', table => {
        table
          .increments('fileId')
          .unsigned()
          .notNullable()

        table.string('fileName', 60).notNullable();
        table.string('issuer');
        table.string('recipient');
        table.string('description')

      });


     
};

exports.down = function(knex, Promise) {
  
};
