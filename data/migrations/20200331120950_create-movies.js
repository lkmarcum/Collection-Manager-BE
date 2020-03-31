exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", tbl => {
    tbl.increments();

    tbl
      .integer("collection_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("collections")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .index();
    tbl.string("title", 255).notNullable();
    tbl.string("genre", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("movies");
};
