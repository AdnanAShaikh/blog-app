const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
  getUserBlogByIdController,
} = require("../controllers/blogController");
const { authenticateToken } = require("../middlewares/jwt");

const router = express.Router();

//GET all blog
router.get("/all-blogs", getAllBlogsController);

//POST create blog
router.post("/create-blog", createBlogController);

//PUT update blog
router.put("/update-blog/:id", updateBlogController);

//DELETE blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET one blog
router.get("/get-blog/:id", getBlogByIdController);

router.get("/user-blog/:id", getUserBlogByIdController);

module.exports = router;
