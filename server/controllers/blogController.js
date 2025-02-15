const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const moment = require("moment");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: "no blog found" });
    }
    return res.status(200).json({
      success: true,
      BlogCount: blogs.length,
      message: "All blogs list",
      blogs,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//POST create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, user, image } = req.body;

    // Validate required fields (title, description, user)
    if (!title || !description) {
      return res.status(400).json({ message: "Fill All fields ! ! !" });
    }

    if (!user) {
      return res.status(400).json({ message: "Check if you are logged in" });
    }

    const existingUser = await userModel.findById(user);

    // Validate user existence
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist! ! !" });
    }

    // Create a new blog entry
    const newBlog = new blogModel({
      user,
      title,
      description,
      image,
    });

    const session = await mongoose.startSession();

    session.startTransaction();
    await newBlog.save({ session });

    // Add the blog to the user's list of blogs
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Blog successfully created ! ! !",
      blog: newBlog,
      user: user,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//PUT update blog by id
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Success update!", blog });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//Delete blog by id
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog and populate the user
    const blog = await blogModel.findById(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Remove the blog from the user's blogs array
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    // Delete the blog
    await blogModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted blog" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//GET blog by id
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel
      .findById(id)
      .populate("user", "username image followers following"); // Populates only 'username' and 'image' fields from user

    if (!blog) {
      return res.status(404).json({ message: "Not FOund blog  !!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "FOund BLOG ! !! ", blog });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.getUserBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params; // user id
    const userBlog = await userModel.findById(id).populate("blogs");

    if (!userBlog) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({
      success: true,
      totalBlogs: userBlog.blogs.length,
      userBlog,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

exports.commentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, postedById } = req.body;

    const blog = await blogModel.findById(id);

    const user = await userModel.findById(postedById);

    if (!blog || !user) {
      return res.status(404).json({ message: "Blog or user not found" });
    }

    const date = moment(Date.now()).fromNow();

    const newComment = {
      text,
      username: user.username,
      image: user.image,
      date: date,
    };

    blog.comments.push(newComment);

    await blog.save();

    return res.status(200).json({
      success: true,
      newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment", error });
  }
};

exports.unCommentController = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
};
