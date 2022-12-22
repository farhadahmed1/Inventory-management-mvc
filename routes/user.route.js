const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
//const authorization = require("../middleware/authorization");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/signup", userController.signup);
router.get(
  "/users",
  // authorization("admin", "store-manage"),
  // verifyToken,
  userController.getUsers
);
router.post("/login", userController.login);
router.get("/me", verifyToken, userController.getMe);
