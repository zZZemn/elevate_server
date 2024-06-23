const mongoose = require("mongoose");

const reactSchema = mongoose.Schema(
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
    reaction: {
      type: Number,
      required: [true, "Please add reaction"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("React", reactSchema);
