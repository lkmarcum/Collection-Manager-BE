const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findByCollection,
  findById,
};

async function insert(movie) {
  return db("movies").insert(collection).returning("id");
}

function findByCollection(collection_id) {
  return db("movies").where({ collection_id });
}

function findById(id) {
  return db("movies").where({ id }).first();
}
