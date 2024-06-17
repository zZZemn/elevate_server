const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please add user id"],
    },
    postId: {
      type: String,
      required: [true, "Please add post id"],
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
