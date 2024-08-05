const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/all-user", getAllUsers);

// Create new user
router.post("/register", registerController);

// Login
router.post("/login", loginController);

module.exports = router;
