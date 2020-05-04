const express = require("express");
require("dotenv").config();

const Users = require("../users/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        message: `The user ${user} has successfully been created.`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error attempting to register user: ${err}`,
      });
    });
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findByUsername(username)
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        });
      } else {
        return res.status(401).json({ error: "Incorrect credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    payload: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = server;
