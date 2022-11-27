/**
 *1 check if token is exist
 *2 if not token send res
 *3 decode the token
 *4 if valid token
 */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");
module.exports = async (req, res, next) => {
  try {
    const token = await req.headers?.authorization?.split(" ")?.[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "you are not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const user = User.findOne({ email: decoded.email });
    // req.user = user;

    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token",
    });
  }
};
