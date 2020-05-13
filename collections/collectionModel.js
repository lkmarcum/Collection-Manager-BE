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

function getAll() {
  return db("collections");
}

function findByOwner(owner_id) {
  // return db("collections").where({ owner_id });
  return db.raw(`SELECT * from collections where owner_id = ${owner_id}`);
}

function findById(id, table) {
  return db(table).where({ collection_id: id });
}
