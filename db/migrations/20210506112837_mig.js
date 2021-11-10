
exports.up = function(knex) {
    return knex.schema.table('files', function(t) {

        t.string('qrcode',1000);

    });
};

 


exports.down = function(knex) {
  
};
