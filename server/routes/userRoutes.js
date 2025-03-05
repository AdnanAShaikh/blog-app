const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  followUser,
  getUserById,
  unFollowUser,
  getUserByName,
  getFollowersList,
  getFollowingList,
  googleLoginController,
  patchUserDetails,
  getCurrentUser,
  likeByBlogId,
} = require("../controllers/userController");

const router = express.Router();

//----- Static Routes -------
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

// ------------------------------------------------------------------------
// ----- Dynamic Routes -----
//get user by id
router.get("/:id", getUserById);

//PATCH User Details
router.patch("/patch", patchUserDetails);

//get user by @
router.get("/name/:usernameAt", getUserByName);

//follow by name
router.post("/follow", followUser);

//follow list
router.get("/follower/list/:name", getFollowersList);

//following list
router.get("/following/list/:name", getFollowingList);

//Like by blogID
router.post("/like/blog", likeByBlogId);

module.exports = router;
