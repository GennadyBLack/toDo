const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}
