const mongoose = require("mongoose");

const postPicSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add post id"],
      ref: "Post",
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
