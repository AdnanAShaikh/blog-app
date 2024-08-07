const { generateToken, authenticateToken } = require("../middlewares/jwt");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const Users = await userModel.find({});
    res.status(200).json(Users);
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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
    const user = new userModel({ username, email, password: hashedPassword });
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
    const token = generateToken(user._id);

    res.cookie("jwt", token, { httpOnly: true });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logoutController = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
};
