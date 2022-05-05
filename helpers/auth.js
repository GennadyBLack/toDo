const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

function checkToken(token) {
  try {
    console.log(token, "checkToken");
    return jwt.verify(token, tokenSecret, (err, value) => {
      if (err) throw new Error("failed to authenticate token");
      else {
        return value.data;
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { generateToken, checkToken };
