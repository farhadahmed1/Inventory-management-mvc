const { generateToken } = require("../utils/token");
const {
  signupService,
  findUserByEmail,
  getUsersService,
} = require("../services/user.services");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(200).json({
      status: "success",
      message: "User signed up successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

/**
 * Login User system
 * 1 check if email and password are given
 * 2 login user with email
 * 3 if not user send res
 * 4 compare password
 * 5 if password not correct send res
 * 6 check if  user is active
 * 7 if not active send res
 * 8 generate token 
 * 9 send user and token
 
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found , Please create a new account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        error: "email and password do not match",
      });
    }

    if (user.status != "active") {
      return res.status(403).json({
        status: "fail",
        error: "Your account is not active yet",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "Login  successfully",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// all users data get

exports.getUsers = async (req, res) => {
  try {
    const user = await getUsersService();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get Users",
      error: error.message,
    });
  }
};
