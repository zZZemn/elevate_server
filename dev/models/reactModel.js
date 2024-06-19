const mongoose = require("mongoose");

const reactSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please add user id"],
    },
    postId: {
      type: String,
      required: [true, "Please add post id"],
    },
    reaction: {
      type: String,
      required: [true, "Please add post id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("React", reactSchema);
