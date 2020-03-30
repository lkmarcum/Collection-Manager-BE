exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, username: "test1", password: "pw1" },
        { id: 2, username: "test2", password: "pw2" },
        { id: 3, username: "test3", password: "pw3" }
      ]);
    });
};
