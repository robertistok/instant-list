const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const setToken = ({ data, res }) => {
  const jwtToken = jwt.sign(data, JWT_SECRET);
  res.cookie("token", jwtToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days cookie
  });
};

const removeToken = ({ res, tokenName = "token" }) => res.clearCookie(tokenName);

const verifyToken = token => jwt.verify(token, JWT_SECRET);

module.exports = { setToken, removeToken, verifyToken };
