const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const PostPic = require("../models/postPicModel");

const postContent = asyncHandler(async (req, res) => {
  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption.");
  }

  const post = await Post.create({
    caption: req.body.caption,
  });

  res.status(200).json(post);

  console.log("ID: " + post._id);
});

module.exports = { postContent };
