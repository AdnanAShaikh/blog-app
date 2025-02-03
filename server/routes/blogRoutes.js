const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
  getUserBlogByIdController,
  commentController,
  unCommentController,
} = require("../controllers/blogController");
const { authenticateToken } = require("../middlewares/jwt");

const router = express.Router();

//GET all blog
router.get("/all", getAllBlogsController);

//GET one blog
router.get("/:id", getBlogByIdController);

//POST create blog
router.post("/create", createBlogController);

//PUT update blog
router.put("/update/:id", updateBlogController);

//DELETE blog
router.delete("/delete/:id", deleteBlogController);

router.get("/user/blogs/:id", getUserBlogByIdController);

//comment routes
router.post("/:id/comment", commentController);

module.exports = router;
