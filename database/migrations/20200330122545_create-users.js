exports.up = function(knex) {
  return knex.schema.createTable("user", table => {
    table.increments();
    table
      .text("username")
      .notNullable()
      .unique();
    table.text("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
