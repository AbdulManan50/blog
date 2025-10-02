const jwt = require("jsonwebtoken");

const secrat = "Mananiqbal50@gmail.com";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = jwt.sign(payload, secrat);

  return token;
}

function validToken(token) {
  const payload = jwt.verify(token, secrat);
  return payload;
}

module.exports = { createTokenForUser, validToken };
