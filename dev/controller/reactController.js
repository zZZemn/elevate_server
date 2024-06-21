const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const React = require("../models/reactModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const insertReaction = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    res.status(400);
    throw new Error("Please add user id");
  } else if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
    res.status(400);
    throw new Error("Invalid user id");
  } else {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
  }

  if (!req.body.postId) {
    res.status(400);
    throw new Error("Please add post id");
  } else if (!mongoose.Types.ObjectId.isValid(req.body.postId)) {
    res.status(400);
    throw new Error("Invalid post id");
  } else {
    const post = await Post.findById(req.body.postId);
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
  }

  if (!req.body.reaction) {
    res.status(400);
    throw new Error("Please add reaction");
  }

  if (req.body.reaction > 4 || req.body.reaction < 1) {
    res.status(400);
    throw new Error("Invalid reaction");
  }

  const react = await React.create({
    userId: req.body.userId,
    postId: req.body.postId,
    reaction: req.body.reaction,
  });

  res.status(200).json(react);
});

module.exports = { insertReaction };

//   1  - Like
//   2  - Love
//   3  - Wow
//   4  - Support
