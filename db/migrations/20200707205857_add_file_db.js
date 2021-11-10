exports.up = async function up(knex) {
    await knex.schema.createTable('files', table => {
      table
        .increments('id')
        .unsigned()
        .notNullable()
        .primary(['file_job_pkey']);
      table.string('owner_id', 60).notNullable();
      table.string('file_name', 60).notNullable();
      table.string('signature').notNullable();
      table.string('hash').notNullable();
      table.timestamp('signed_at').defaultTo(knex.fn.now());
    //   table.unique('email');
    });
  
  
  
  
  };
  
  exports.down = async function down(knex) {
    await knex.schema.dropTable('files');
  };
  