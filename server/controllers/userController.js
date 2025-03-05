const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");

const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Enter all details !" });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists!" });
    }

    //hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      image,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Success new user created !!",
      user: user,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.googleLoginController = async (req, res) => {
  try {
    const { email, username, image, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      // Ensure uploads directory exists
      const uploadDir = path.join(__dirname, "..", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Download image
      let imagePath = null;
      try {
        const imageResponse = await axios.get(image, {
          responseType: "arraybuffer",
        });
        imagePath = `uploads/${email}-profile.jpg`;
        fs.writeFileSync(
          path.join(__dirname, "..", imagePath),
          imageResponse.data
        );
      } catch (err) {
        console.error("Error downloading image:", err.message);
        imagePath = "/default-avatar.jpg"; // Fallback image
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const usernameAt = "@" + email?.split("@")[0];
      // Create user
      user = new userModel({
        usernameAt,
        username,
        email,
        password: hashedPassword,
        image: imagePath,
      });

      await user.save();
    }

    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        image: user?.image,
        username: user?.username,
        usernameAt: user?.usernameAt,
      },
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in googleLoginController:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(401).json({ message: "Enter all details !" });
    }

    const user = await userModel.findOne({ email });

    //validate user
    if (!user) {
      return res.status(404).json({ message: "User doesn't exists ! ! " });
    }

    //password
    console.log("Plain text password:", password);
    console.log("Hashed password from DB:", user.password);
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    // const token = generateToken(user._id);

    // res.cookie("jwt", token, { httpOnly: true });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const { usernameAt } = req.params;

    const user = await userModel.findOne({ usernameAt }).populate("blogs");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists! !!" });
    }
    console.log(user);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).populate("blogs");

    if (!user) {
      console.log("User not found in database!");
      return res
        .status(404)
        .json({ success: false, message: "No user exists! !!" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body; // From (current) -> To (viewing)

    const fromUser = await userModel.findById(fromUserId);
    const toUser = await userModel.findById(toUserId);

    if (!fromUser || !toUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists!" });
    }

    if (!fromUser.following.includes(toUser._id)) {
      fromUser.following.push(toUser._id);
      toUser.followers.push(fromUser._id);

      await fromUser.save();
      await toUser.save();

      return res
        .status(200)
        .json({ success: true, message: "Followed User!", fromUser, toUser });
    } else if (fromUser.following.includes(toUser._id)) {
      fromUser.following.pull(toUser._id);
      toUser.followers.pull(fromUser._id);

      await fromUser.save();
      await toUser.save();

      return res
        .status(200)
        .json({ success: true, message: "Unfollowed User", fromUser, toUser });
    } else {
      return res.status(402).json({
        success: false,
        message: "Some Error",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.cookies?.userId;
    console.log(req.cookies);

    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFollowersList = async (req, res) => {
  try {
    const name = req.params.name;
    const list = await userModel
      .findOne({ username: name })
      .select("followers")
      .populate("followers");

    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "No list exists! !!" });
    }
    return res.status(200).json({ success: true, followers: list.followers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFollowingList = async (req, res) => {
  try {
    const name = req.params.name;

    const list = await userModel
      .findOne({ username: name })
      .select("following")
      .populate("following");

    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "No list exists! !!" });
    }
    return res.status(200).json({ success: true, following: list.following });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Bio updated successfully", user: updatedUser });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.patchUserDetails = async (req, res) => {
  try {
    const { username, bio, shortBio, userId } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { username, bio, shortBio },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.likeByBlogId = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    const user = await userModel.findById(userId);
    const blog = await blogModel.findById(blogId);

    if (!user || !blog) {
      return res
        .status(404)
        .json({ success: false, message: "No user / blog exists!" });
    }

    if (!user.blogsLiked.includes(blogId)) {
      user.blogsLiked.push(blogId);
      blog.likes.push(userId);
      await user.save();
      await blog.save();
      return res
        .status(200)
        .json({ success: true, message: "liked blog", user, blog });
    } else if (user.blogsLiked.includes(blogId)) {
      user.blogsLiked.pull(blogId);
      blog.likes.pull(userId);

      await user.save();
      await blog.save();
      return res
        .status(200)
        .json({ success: true, message: "removed like", user, blog });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
