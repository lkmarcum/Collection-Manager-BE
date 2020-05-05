const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findByCollection,
  findById,
  getAll,
};

async function insert(movie) {
  return db("movies").insert(movie).returning("id");
}

function findByCollection(collection_id) {
  return db("movies").where({ collection_id });
}

function findById(id) {
  return db("movies").where({ id });
}

function getAll() {
  return db("movies");
}
