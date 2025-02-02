const mongoose = require("mongoose");

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

    comments: [
      {
        text: String,
        postedBy: String,
        created: { type: Date, default: Date.now() },
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [],
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
