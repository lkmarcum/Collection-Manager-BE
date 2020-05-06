const jwt = require("jsonwebtoken");

module.exports = {};

const jwtKey =
  process.env.JWT_SECRET || "look at this neat little secret right here";

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Not Authorized" });
      } else {
        req.user = {
          username: decoded.username,
          id: decoded.subject,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Not Authorized" });
  }
}
