const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const addComment = asyncHandler(async (req, res) => {
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

  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please add comment.");
  }

  const comment = await Comment.create({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  });

  res.status(200).json(comment);
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid post id");
  }

  const comments = await Comment.find({ postId: req.params.id });
  if (!comments) {
    res.status(400);
    throw new Error("No comment found");
  }
  res.status(200).json(comments);
});

module.exports = { addComment, getCommentsByPostId };
