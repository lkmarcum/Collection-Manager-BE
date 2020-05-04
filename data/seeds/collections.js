exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("collections")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("collections").insert([
        { owner_id: 7, title: "User 7's Movies" },
        { owner_id: 9, title: "User 9's Movies" },
        { owner_id: 8, title: "User 8's Movies" }
      ]);
    });
};
