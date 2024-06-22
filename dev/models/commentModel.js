const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add user id"],
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add post id"],
      ref: "Post",
    },
    comment: {
      type: String,
      required: [true, "Please add comment"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
