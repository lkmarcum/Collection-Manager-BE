const express = require("express");
require("dotenv").config();

const Users = require("../users/userModel.js");
const Movies = require("../movies/movieModel");
const Collections = require("../collections/collectionModel");
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

server.post("/collections", (req, res) => {
  const collection = req.body;

  Collections.insert(collection)
    .then((id) => {
      res.status(201).json({
        message: `Collection created`,
        id,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/collections/:id", (req, res) => {
  console.log(`Param ID: ${req.params.id}`);
  Collections.findById(req.params.id)
    .then((collection) => {
      console.log(`collection list: ${collection}`);
      console.log(`collection: ${collection[0]}`);
      // const coll = res[0];
      res.status(200).json(collection[0]);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/collections", (req, res) => {
  Collections.getAll()
    .then((collections) => {
      res.status(200).json(collections);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get("/collections/owner/:id", (req, res) => {
  Collections.findByOwner(req.params.id)
    .then((list) => {
      res.status(200).json({ collections: list });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.pos("/movies", (req, res) => {
  const movie = req.body;

  Movies.insert(movie)
    .then((id) => {
      res.status(201).json({
        message: "Movie created",
        id,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/movies", (req, res) => {
  Movies.getAll()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/movies/:id", (req, res) => {
  Movies.findById(req.params.id)
    .then((movie) => {
      res.status(200).json(movie[0]);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/movies/collection/:id", (req, res) => {
  Movies.findByCollection(req.params.id)
    .then((list) => {
      res.status(200).json({ movies: list });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = server;
