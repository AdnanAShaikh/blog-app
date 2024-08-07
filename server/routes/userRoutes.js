const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  logoutController,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/all-user", getAllUsers);

// Create new user
router.post("/register", registerController);

// Login
router.post("/login", loginController);

router.get("/logout", logoutController);

module.exports = router;
