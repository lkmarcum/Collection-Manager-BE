exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert([
        { collection_id: 10, title: "Side Effects", genre: "Drama" },
        { collection_id: 10, title: "Wedding Crashers", genre: "Comedy" },
        { collection_id: 10, title: "Law Abiding Citizen", genre: "Action" },
        {
          collection_id: 11,
          title: "Crazy Stupid Love",
          genre: "Romantic Comedy"
        },
        { collection_id: 11, title: "Lincoln", genre: "Drama" },
        { collection_id: 11, title: "The Rookie", genre: "Sports" },
        { collection_id: 12, title: "12 Angry Men", genre: "Drama" },
        { collection_id: 12, title: "A Few Good Men", genre: "Drama" },
        { collection_id: 12, title: "The Martian", genre: "Sci-Fi" }
      ]);
    });
};
