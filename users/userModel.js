const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  findByUsername,
};

async function insert(user) {
  return db("users").insert(user).returning(user.username);
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db("users");
}

function findById(id) {
  return null;
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}
