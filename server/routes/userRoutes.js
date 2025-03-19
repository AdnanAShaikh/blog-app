const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  followUser,
  getUserById,
  getUserByName,
  googleLoginController,
  patchUserDetails,
  getCurrentUser,
  likeController,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/all-user", getAllUsers);

// Create new user
router.post("/register", registerController);

// Login
router.post("/login", loginController);

//google login
router.post("/google/login", googleLoginController);

//get current user details
router.get("/current", getCurrentUser);

//follow by name
router.post("/follow", followUser);

//Like by blogID
router.post("/like/blog", likeController);

//get user by id
router.get("/:id", getUserById);

//PATCH User Details
router.patch("/patch", patchUserDetails);

//get user by @
router.get("/name/:usernameAt", getUserByName);

module.exports = router;
