const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
exports.getUsersService = async () => {
  const user = await User.find({});
  // console.log(user);
  return user;
};
