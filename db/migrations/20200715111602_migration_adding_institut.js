
exports.up = function(knex, Promise) {


    return knex.schema.createTable('etablissements', table => {
        table
          .increments('etabId')
          .unsigned()
          .notNullable()

        table.string('name', 90).notNullable();
        
        table.string('details');
      });


     

};

exports.down = function(knex) {
  
};
