const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  image: { type: String, required: true }, // Ensure `image` is a required field
  date: { type: String, required: true }, // Ensure `date` is a required field
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
    },

    comments: [commentSchema],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
