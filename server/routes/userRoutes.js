const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  followUser,
  getUserById,
  getCurrentUser,
  unFollowUser,
  getUserByName,
  getFollowersList,
  getFollowingList,
  googleLoginController,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/all-user", getAllUsers);

// Create new user
router.post("/register", registerController);

// Login
router.post("/login", loginController);

//get user by name
router.get("/name/:name", getUserByName);

//get user by id
router.get("/:id", getUserById);

//follow by name
router.post("/follow/:name", followUser);

//unfollow
router.post("/unfollow/:name", unFollowUser);

//get current user details
router.get("/current/:current", getCurrentUser);

//follow list
router.get("/follower/list/:name", getFollowersList);

//following list
router.get("/following/list/:name", getFollowingList);

//google login
router.post("/google/login", googleLoginController);

module.exports = router;
