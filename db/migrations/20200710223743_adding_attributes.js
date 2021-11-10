
exports.up = function(knex, Promise) {
    return knex.schema.table('files', function(t) {
        t.string('first_attribut'); 
        t.string('second_attribut'); 
        t.string('third_attribut'); 
        t.string('recipient');
        t.string('description');
       
    });
};

exports.down = function(knex, Promise) {
  
};
