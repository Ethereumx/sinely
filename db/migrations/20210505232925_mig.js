exports.up = function(knex) {
    return knex.schema.table('files', function(t) {

      //  t.string('qrcode',500);

    });
};

 

exports.down = function(knex) {
  
};
