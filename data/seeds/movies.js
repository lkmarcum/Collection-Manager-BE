exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert([
        { collection_id: 4, title: "Side Effects", genre: "Drama" },
        { collection_id: 4, title: "Wedding Crashers", genre: "Comedy" },
        { collection_id: 4, title: "Law Abiding Citizen", genre: "Action" },
        {
          collection_id: 5,
          title: "Crazy Stupid Love",
          genre: "Romantic Comedy"
        },
        { collection_id: 5, title: "Lincoln", genre: "Drama" },
        { collection_id: 5, title: "The Rookie", genre: "Sports" },
        { collection_id: 6, title: "12 Angry Men", genre: "Drama" },
        { collection_id: 6, title: "A Few Good Men", genre: "Drama" },
        { collection_id: 6, title: "The Martion", genre: "Sci-Fi" }
      ]);
    });
};
