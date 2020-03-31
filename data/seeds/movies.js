exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { collection_id: 1, title: "Side Effects", genre: "Drama" },
        { collection_id: 1, title: "Wedding Crashers", genre: "Comedy" },
        { collection_id: 1, title: "Law Abiding Citizen", genre: "Action" },
        {
          collection_id: 2,
          title: "Crazy Stupid Love",
          genre: "Romantic Comedy"
        },
        { collection_id: 2, title: "Lincoln", genre: "Drama" },
        { collection_id: 2, title: "The Rookie", genre: "Sports" },
        { collection_id: 3, title: "12 Angry Men", genre: "Drama" },
        { collection_id: 3, title: "A Few Good Men", genre: "Drama" },
        { collection_id: 3, title: "The Martion", genre: "Sci-Fi" }
      ]);
    });
};
