const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const setToken = ({ data, res }) => {
  const jwtToken = jwt.sign(data, JWT_SECRET);
  res.cookie("token", jwtToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days cookie
  });
};

const verifyToken = token => jwt.verify(token, JWT_SECRET);

module.exports = { setToken, verifyToken };
