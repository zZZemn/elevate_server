const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const PostPic = require("../models/postPicModel");

const postContent = asyncHandler(async (req, res) => {
  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption.");
  }

  if (!req.files) {
    res.status(400);
    throw new Error("Please upload photo.");
  }

  const post = await Post.create({
    caption: req.body.caption,
  });

  const postPicPromises = req.files.map((file) => {
    return PostPic.create({
      postId: post._id,
      url: `/uploads/${file.filename}`,
    });
  });
  await Promise.all(postPicPromises);

  const postPics = await PostPic.find({ postId: post._id });

  res.status(200).json({
    post: post,
    images: postPics,
  });
});

module.exports = { postContent };
