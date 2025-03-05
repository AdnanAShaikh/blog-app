const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!"],
    },
    usernameAt: {
      type: String,
      required: [true, "usernameAt is required!"],
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    bio: {
      type: String,
    },
    shortBio: {
      type: String,
    },
    blogsLiked: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;
  await Blog.deleteMany({ author: userId }); // Assuming `author` in Blog model stores userId
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
