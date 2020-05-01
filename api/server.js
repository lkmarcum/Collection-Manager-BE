const express = require("express");

const Users = require("../users/userModel.js");
const bcrypt = require("bcrypt");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  Users.insert({
    username: req.body.username,
    password: hashedPassword,
  })
    .then((user) => {
      res.status(201).json({
        message: `The user ${user.username} has successfully been created.`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error attempting to register user: ${err}`,
      });
    });
});

module.exports = server;
