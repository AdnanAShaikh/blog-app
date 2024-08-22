const { generateToken, authenticateToken } = require("../middlewares/jwt");
const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

    if (!email || !username) {
      return res.status(401).json({ message: "Enter all details !" });
    }

    // const token = generateToken(username);
    // res.cookie("jwt", token, { httpOnly: true });

    let user = await userModel.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new userModel({
        username,
        email,
        password: hashedPassword,
        image,
      });

      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Login successful", user });
    }

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
    const name = req.params.name;

    const user = await userModel.findOne({ username: name }).populate("blogs");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists! !!" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserByIdForName = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No such user! ! " });
  }

  return res.status(200).json({ success: true, user: user.username });
};
exports.followUser = async (req, res) => {
  try {
    const name = req.params.name; // The name of the user to follow
    const { id } = req.body; // My user ID

    const myUser = await userModel.findById(id);
    const thatUser = await userModel.findOne({ username: name });

    if (!myUser || !thatUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists!" });
    }

    // Check if the user is already following the other user by comparing IDs
    if (!myUser.following.includes(thatUser._id)) {
      myUser.following.push(thatUser._id); // Add the other user's ID to my following list
      thatUser.followers.push(myUser._id); // Add my user ID to the other user's followers list

      await myUser.save(); // Save the updated myUser document
      await thatUser.save(); // Save the updated thatUser document

      return res.status(200).json({ success: true, myUser, thatUser });
    } else {
      return res.status(402).json({
        success: false,
        message: "You are already following that user",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.unFollowUser = async (req, res) => {
  try {
    const name = req.params.name; // The name of the user to follow
    const { id } = req.body; // My user ID

    const myUser = await userModel.findById(id);
    const thatUser = await userModel.findOne({ username: name });

    if (!myUser || !thatUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists!" });
    }

    // Check if the user is already following the other user by comparing IDs
    if (myUser.following.includes(thatUser._id)) {
      myUser.following.pull(thatUser._id); // Add the other user's ID to my following list
      thatUser.followers.pull(myUser._id); // Add my user ID to the other user's followers list

      await myUser.save(); // Save the updated myUser document
      await thatUser.save(); // Save the updated thatUser document

      return res.status(200).json({ success: true, myUser, thatUser });
    } else {
      return res.status(402).json({
        success: false,
        message: "Som error....",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const current = req.params.current;

    const currentUser = await userModel.findById(current);

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user exists! !!" });
    }
    return res.status(200).json({ success: true, currentUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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
