const mongoose = require("mongoose");

const postPicSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "Please add post id"],
    },
    url: {
      type: String,
      required: [true, "Please add url"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostPic", postPicSchema);
