const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findByOwner,
  findById,
  getAll,
};

async function insert(collection) {
  return db("collections").insert(collection).returning("id");
}

function findByOwner(owner_id) {
  return db("collections").where({ owner_id });
}

function findById(id) {
  return db("collections").where({ id });
}

function getAll() {
  return db("collections");
}
