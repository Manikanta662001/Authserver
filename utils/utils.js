const jwt = require("jsonwebtoken");
require("dotenv").config();
const createAccessToken = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "0.5m" }
  );
  return accessToken;
};
const createRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
};
module.exports = { createAccessToken, createRefreshToken };
