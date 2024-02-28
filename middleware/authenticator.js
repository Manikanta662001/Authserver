const { STATUS_TYPES } = require("../utils/Constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(STATUS_TYPES.UNAUTHORIZED)
      .json({ error: "Token not found" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode)
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(STATUS_TYPES.FORBIDDEN)
      .json({ error: "Token not valid" });
  }
};
module.exports = { authenticator };
