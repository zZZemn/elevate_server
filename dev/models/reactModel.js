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
      type: Number,
      required: [true, "Please add reaction"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("React", reactSchema);
