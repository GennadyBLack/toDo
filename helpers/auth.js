const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

function checkToken(token) {
  return jwt.verify(token, tokenSecret, (err, value) => {
    if (err) res.status(500).json({ error: "failed to authenticate token" });
    return value.data;
  });
}
module.exports = { generateToken, checkToken };
