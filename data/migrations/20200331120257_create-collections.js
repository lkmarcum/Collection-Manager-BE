exports.up = function(knex, Promise) {
  return knex.schema.createTable("collections", tbl => {
    tbl.increments();

    tbl
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("collections");
};
