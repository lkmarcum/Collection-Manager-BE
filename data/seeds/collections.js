exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("collections")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("collections").insert([
        { owner_id: 1, title: "User 1's Movies" },
        { owner_id: 3, title: "User 2's Movies" },
        { owner_id: 2, title: "User 3's Movies" }
      ]);
    });
};
