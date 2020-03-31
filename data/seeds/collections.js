exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { owner_id: 1, title: "User 1's Movies" },
        { owner_id: 3, title: "User 2's Movies" },
        { owner_id: 2, title: "User 3's Movies" }
      ]);
    });
};
